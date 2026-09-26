import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Question from './models/Question.js';
import Interview from './models/Interview.js';
import Progress from './models/Progress.js';
import Bookmark from './models/Bookmark.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing old data...');
    await User.deleteMany({});
    await Question.deleteMany({});
    await Interview.deleteMany({});
    await Progress.deleteMany({});
    await Bookmark.deleteMany({});

    console.log('Creating Admin & Demo Users...');
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const studentPassword = await bcrypt.hash('Student@123', 10);

    const admin = await User.create({
      name: 'Admin PrepAI',
      email: 'admin@prepai.com',
      password: adminPassword,
      role: 'admin',
      targetRole: 'Full Stack Developer',
      experienceLevel: 'Advanced',
      skills: ['System Design', 'Security', 'Node.js', 'React', 'MongoDB'],
      programmingLanguages: ['JavaScript', 'TypeScript', 'Python', 'Java']
    });

    const student = await User.create({
      name: 'Alex Johnson',
      email: 'student@prepai.com',
      password: studentPassword,
      role: 'user',
      targetRole: 'Software Developer',
      experienceLevel: 'Intermediate',
      skills: ['React', 'JavaScript', 'SQL', 'Data Structures'],
      programmingLanguages: ['JavaScript', 'Java', 'Python'],
      preferredInterviewType: 'Mixed',
      streakCount: 5
    });

    console.log('Seeding Question Bank...');
    const sampleQuestions = [
      // Technical - Data Structures & Algorithms (DSA)
      {
        question: 'Explain the difference between a Array and a Linked List in memory representation and operation complexities.',
        category: 'Data Structures',
        difficulty: 'Beginner',
        answer: 'Arrays store elements in contiguous memory locations providing O(1) random access, but insertion/deletion requires shifting O(N). Linked Lists use pointers to non-contiguous memory blocks allowing O(1) insertion/deletion given pointer, but O(N) traversal access.',
        explanation: 'Memory layout impacts CPU cache utilization. Arrays take advantage of spatial locality, whereas Linked Lists incur pointer overhead per node.',
        tags: ['DSA', 'Arrays', 'LinkedList', 'Memory']
      },
      {
        question: 'What is a Hash Table collision and how is it resolved?',
        category: 'Data Structures',
        difficulty: 'Intermediate',
        answer: 'A hash collision occurs when two distinct keys generate the exact same index hash value. Common resolution techniques include Chaining (linked list buckets) and Open Addressing (Linear Probing, Quadratic Probing, Double Hashing).',
        explanation: 'Good hash functions minimize collisions. Average lookup time is O(1), but degrades to O(N) in worst-case collisions if chaining is used.',
        tags: ['DSA', 'Hashing', 'Data Structures']
      },
      {
        question: 'How do you detect a cycle in a Linked List efficiently?',
        category: 'Algorithms',
        difficulty: 'Intermediate',
        answer: 'Use Floyd’s Cycle Detection Algorithm (Slow and Fast pointer approach). Move slow pointer 1 step and fast pointer 2 steps. If fast catches up to slow, a loop exists.',
        explanation: 'Runs in O(N) time complexity and O(1) space complexity without needing additional hash sets.',
        tags: ['DSA', 'Algorithms', 'Pointers']
      },
      {
        question: 'What is the dynamic programming principle of Overlapping Subproblems and Optimal Substructure?',
        category: 'Algorithms',
        difficulty: 'Advanced',
        answer: 'Optimal Substructure means the optimal solution of a problem can be constructed from optimal solutions of its subproblems. Overlapping Subproblems means the recursive tree repeatedly solves the exact same subproblems, which DP caches via Memoization or Tabulation.',
        explanation: 'Examples include 0/1 Knapsack, Longest Common Subsequence, and Fibonacci numbers.',
        tags: ['Algorithms', 'Dynamic Programming', 'Optimization']
      },
      {
        question: 'Explain QuickSort time complexity in best, average, and worst case scenarios.',
        category: 'Algorithms',
        difficulty: 'Intermediate',
        answer: 'Best Case: O(N log N) when pivot divides array into two equal halves. Average Case: O(N log N). Worst Case: O(N^2) when array is already sorted and worst pivot is picked continuously.',
        explanation: 'Randomized QuickSort picks random pivots to avoid O(N^2) worst-case triggers on pre-sorted inputs.',
        tags: ['Algorithms', 'Sorting', 'Time Complexity']
      },

      // JavaScript & React
      {
        question: 'Explain Event Delegation in JavaScript and its advantages.',
        category: 'JavaScript',
        difficulty: 'Intermediate',
        answer: 'Event Delegation is a pattern where a single event listener is attached to a parent element instead of multiple listeners on individual children, relying on event bubbling up the DOM tree.',
        explanation: 'Saves memory, simplifies code, and automatically handles dynamically inserted DOM nodes.',
        tags: ['JavaScript', 'DOM', 'Performance']
      },
      {
        question: 'What is the JavaScript Event Loop, Call Stack, Microtask Queue, and Macrotask Queue?',
        category: 'JavaScript',
        difficulty: 'Advanced',
        answer: 'The Call Stack executes synchronous code. Asynchronous operations enqueue callbacks: Microtasks (Promises, process.nextTick, queueMicrotask) have higher priority and empty completely before Macrotasks (setTimeout, setInterval, I/O) execute.',
        explanation: 'Understanding this prevents UI locking and async race conditions.',
        tags: ['JavaScript', 'Event Loop', 'Async']
      },
      {
        question: 'How does React Reconciliation and the Virtual DOM diffing algorithm work?',
        category: 'React',
        difficulty: 'Advanced',
        answer: 'React creates an in-memory Virtual DOM tree. When state changes, it generates a new tree and uses a heuristic O(N) diffing algorithm comparing element types and `key` attributes to apply minimal DOM mutations.',
        explanation: 'Keys allow React to identify moved or mutated elements across renders efficiently.',
        tags: ['React', 'Virtual DOM', 'Performance']
      },
      {
        question: 'What is the difference between `useEffect` and `useLayoutEffect` in React?',
        category: 'React',
        difficulty: 'Intermediate',
        answer: '`useEffect` runs asynchronously after the browser renders and paints to the screen. `useLayoutEffect` runs synchronously after DOM mutations but before the browser paints, avoiding visual flickering when measuring layout.',
        explanation: 'Use `useLayoutEffect` primarily when measuring DOM node dimensions or synchronously forcing layout recalculation.',
        tags: ['React', 'Hooks', 'Lifecycle']
      },

      // Node.js & Backend
      {
        question: 'How does Node.js achieve high non-blocking throughput despite being single-threaded?',
        category: 'Node.js',
        difficulty: 'Intermediate',
        answer: 'Node.js delegates expensive I/O operations (file system, network calls) to libuv worker threadpool via C++ bindings. The single-threaded main loop processes non-blocking events and callbacks asynchronously.',
        explanation: 'Ideal for I/O-intensive workloads, though heavy CPU computations can block the main event loop.',
        tags: ['Node.js', 'Backend', 'Async']
      },

      // Java Questions
      {
        question: 'Explain the JVM Memory Structure (Heap, Stack, Metaspace, Program Counter).',
        category: 'Java',
        difficulty: 'Advanced',
        answer: 'Stack stores local variables and method execution call frames per thread. Heap stores dynamically allocated Objects accessible globally. Metaspace stores class metadata. PC Register tracks execution instruction address.',
        explanation: 'Stack memory is garbage-collected automatically upon method exit; Heap relies on Garbage Collector algorithms like G1 GC or ZGC.',
        tags: ['Java', 'JVM', 'Memory']
      },
      {
        question: 'What is the difference between `HashMap` and `ConcurrentHashMap` in Java?',
        category: 'Java',
        difficulty: 'Intermediate',
        answer: '`HashMap` is non-synchronized and not thread-safe. `ConcurrentHashMap` achieves thread safety without locking the entire map by using segment-level locking / bucket CAS operations for concurrent reads and writes.',
        explanation: 'Allows concurrent read operations without locking and locks individual bucket nodes on write.',
        tags: ['Java', 'Collections', 'Concurrency']
      },
      {
        question: 'Explain the difference between Abstract Class and Interface in Java 8+.',
        category: 'Java',
        difficulty: 'Beginner',
        answer: 'Abstract classes can hold state (instance fields) and constructors. Interfaces cannot have state fields (only public static final constants). Java 8+ interfaces permit `default` and `static` methods; Java 9 added private methods.',
        explanation: 'Classes can implement multiple interfaces but extend only one single abstract class.',
        tags: ['Java', 'OOP', 'Interfaces']
      },

      // SQL & DBMS
      {
        question: 'Explain Database Indexing and how B-Tree indices speed up query execution.',
        category: 'SQL',
        difficulty: 'Intermediate',
        answer: 'An index is a data structure (commonly B-Tree or B+Tree) that maintains sorted references to table rows. Instead of performing a full table scan O(N), indexed lookup operates in logarithmic time O(log N).',
        explanation: 'Indexes speed up SELECT queries with WHERE/JOIN clauses, but add overhead to INSERT, UPDATE, and DELETE operations.',
        tags: ['SQL', 'DBMS', 'Indexing']
      },
      {
        question: 'What are ACID properties in Database Management Systems?',
        category: 'DBMS',
        difficulty: 'Beginner',
        answer: 'Atomicity (all or nothing transaction), Consistency (valid state transitions), Isolation (concurrent transactions execute independently), Durability (persisted committed data despite system failure).',
        explanation: 'Ensures database reliability and data integrity under high concurrency and failure states.',
        tags: ['DBMS', 'SQL', 'ACID']
      },
      {
        question: 'Explain the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.',
        category: 'SQL',
        difficulty: 'Beginner',
        answer: 'INNER JOIN returns matching rows in both tables. LEFT JOIN returns all rows from left table plus matched right rows. RIGHT JOIN returns all right rows. FULL OUTER JOIN returns all rows when there is a match in either left or right.',
        explanation: 'Essential for querying relational schema relationships.',
        tags: ['SQL', 'DBMS', 'Joins']
      },

      // Operating Systems & Networks
      {
        question: 'Explain Process vs Thread and context switching overhead.',
        category: 'Operating Systems',
        difficulty: 'Intermediate',
        answer: 'A Process is an isolated executing program with its own memory space (page tables, file descriptors). A Thread is a lightweight execution unit sharing the parent process memory. Thread context switching is significantly faster than process switching.',
        explanation: 'Process context switching requires flushing CPU cache and updating virtual memory page tables (CR3 register).',
        tags: ['Operating Systems', 'Processes', 'Concurrency']
      },
      {
        question: 'What happens step-by-step when you type a URL into a web browser address bar?',
        category: 'Computer Networks',
        difficulty: 'Intermediate',
        answer: '1. Browser checks local DNS cache / OS hosts file. 2. DNS query resolves IP address. 3. TCP 3-Way Handshake (SYN, SYN-ACK, ACK). 4. TLS/SSL handshake if HTTPS. 5. HTTP GET request sent. 6. Server responds. 7. Browser renders HTML/CSS/JS.',
        explanation: 'Crucial end-to-end full-stack network understanding question.',
        tags: ['Computer Networks', 'HTTP', 'DNS']
      },

      // HR & Behavioral Questions
      {
        question: 'Tell me about yourself and your professional journey.',
        category: 'HR',
        difficulty: 'Beginner',
        answer: 'Present a 2-minute elevator pitch covering: 1. Current role & background. 2. Key achievements and core technical domain expertise. 3. Why this target role matches your career growth objectives.',
        explanation: 'Keep focus concise, enthusiastic, and tailored directly to job description keywords.',
        tags: ['HR', 'Elevator Pitch', 'Behavioral']
      },
      {
        question: 'What are your greatest technical strengths and weaknesses?',
        category: 'HR',
        difficulty: 'Beginner',
        answer: 'For strengths: Cite concrete skills backed by project outcomes. For weakness: Share a real non-fatal area you are actively improving (e.g. initial hesitation delegating tasks, currently using Jira/Scrum tracking).',
        explanation: 'Avoid fake weaknesses like "I work too hard". Frame weaknesses around continuous growth.',
        tags: ['HR', 'Strengths', 'Behavioral']
      },
      {
        question: 'Describe a situation where you had a conflict with a teammate or project direction and how you handled it.',
        category: 'HR',
        difficulty: 'Intermediate',
        answer: 'Use the STAR method (Situation, Task, Action, Result). Emphasize active listening, data-driven compromise, respectful communication, and focusing on user/business impact.',
        explanation: 'Demonstrates emotional intelligence (EQ) and collaborative mindset.',
        tags: ['HR', 'Conflict Resolution', 'STAR']
      },
      {
        question: 'Where do you see yourself in 5 years?',
        category: 'HR',
        difficulty: 'Beginner',
        answer: 'Express ambition to master technical expertise, take ownership of system architectural decisions, mentor junior engineers, and contribute to long-term organization roadmap.',
        explanation: 'Shows commitment, realistic career progression, and growth trajectory.',
        tags: ['HR', 'Career Goals', 'Behavioral']
      },
      {
        question: 'Why should our company hire you over other candidates?',
        category: 'HR',
        difficulty: 'Beginner',
        answer: 'Highlight the unique intersection of your technical skills, problem-solving drive, rapid adaptability, and enthusiasm for the company’s product mission.',
        explanation: 'Align your value proposition directly to the team’s immediate pain points.',
        tags: ['HR', 'Value Proposition', 'Behavioral']
      }
    ];

    const insertedQuestions = await Question.insertMany(
      sampleQuestions.map(q => ({ ...q, createdBy: admin._id }))
    );

    console.log(`Seeded ${insertedQuestions.length} questions into Question Bank.`);

    console.log('Seeding Sample Mock Interview Session...');
    await Interview.create({
      userId: student._id,
      role: 'Software Developer',
      interviewType: 'Mixed',
      difficulty: 'Medium',
      totalQuestions: 4,
      questions: [
        {
          questionText: 'Explain the difference between Array and Linked List in memory representation.',
          category: 'Data Structures',
          userAnswer: 'Arrays use contiguous memory providing O(1) random access. Linked lists use pointers between nodes.',
          feedback: 'Solid answer explaining contiguous memory vs pointer referencing.',
          score: 85
        },
        {
          questionText: 'What is the JavaScript Event Loop?',
          category: 'JavaScript',
          userAnswer: 'Event loop manages execution stack and message queue, executing microtasks like Promises first.',
          feedback: 'Good understanding of microtasks vs macrotasks prioritization.',
          score: 80
        },
        {
          questionText: 'Tell me about a time you handled project conflict.',
          category: 'HR',
          userAnswer: 'I listened to the teammate perspective, looked at benchmark data, and agreed on a benchmark prototype test.',
          feedback: 'Great usage of data-driven conflict resolution.',
          score: 88
        }
      ],
      overallScore: 84,
      categoryScores: {
        technicalKnowledge: 85,
        problemSolving: 82,
        communication: 86,
        confidence: 83
      },
      aiFeedback: {
        strengths: ['Clear explanation of memory structures', 'Data-driven mindset', 'Good communication flow'],
        weaknesses: ['Elaborate more on space complexity details'],
        missingConcepts: ['Cache spatial locality in arrays'],
        suggestedTopics: ['Cache optimization', 'System Design'],
        sampleImprovedAnswer: 'Arrays leverage spatial locality for CPU caches while Linked Lists incur pointer overhead.',
        overallSummary: 'Strong overall performance for an intermediate software developer interview candidate.'
      },
      status: 'completed'
    });

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
