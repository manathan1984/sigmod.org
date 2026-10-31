---
title: "2010 SIGMOD Best Paper Award"
permalink: "/sigmod-awards/citations/2010-sigmod-best-paper-award/"
section: "sigmod"
area: "awards"
wp_id: 372
wp_type: "page"
wp_parent: 348
updated: "2015-07-17"
---

## FAST: Fast Architecture Sensitive Tree Search on Modern CPUs and GPUs

### Changkyu Kim (Intel Corporation), Jatin Chhugani (Intel Corporation), Nadathur Satish (Intel Corporation), Eric Sedlar (Oracle Corporation), Anthony Nguyen (Intel Corporation), Tim Kaldewey (Oracle Corporation), Victor Lee (Intel Corporation), Scott Brandt (University of California, Santa Cruz), Pradeep Dubey (Intel Corporation)

This paper presents FAST, a layout for an in-memory binary tree index that is well-suited for state-of-the-art CPU and GPU architectures. The layout and associated search methods take advantage of SIMD instructions and thread-level parallelism (TLP). FAST also accounts for cache-line sizes and hides cache-miss and TLB-miss latency by processing many outstanding queries simultaneously (with software pipelining and TLP). The paper shows that with all these optimizations, search on GPU is compute bound and search on a CPU is bandwidth bound. To optimize the latter further, the paper presents a key-compression scheme, which also takes advantage of SIMD instructions, to alleviate bandwidth limits and handle larger keys. Experiments show how CPU and GPU perform on trees with different sizes, how many concurrent queries are needed to achieve their peak throughput, and how compression can improve search performance. This paper is an excellent research contribution that provides an end-to-end system design and associated algorithms and techniques to develop a complete solution that leverages the underlying hardware architecture. Given the modular structure of the overall design, the solution can easily be adapted to future architectures.
