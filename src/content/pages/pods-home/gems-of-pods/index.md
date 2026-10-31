---
title: "Gems of PODS"
permalink: "/pods-home/gems-of-pods/"
section: "pods"
area: "pods"
wp_id: 4932
wp_type: "page"
wp_parent: 390
updated: "2026-04-05"
---

The Gems of PODS event features topics and results in PODS that have been highly influential in the PODS community and beyond. The first edition of the Gems of PODS took place at SIGMOD/PODS 2016.

**  
2026**

**Enumeration Theory through the Lens of Database Challenges** \[PDF\]  
Benny Kimelfeld (Technion – Israel Institute of Technology)

**Abstract**  
Computational tasks that require producing many answers arise throughout data management systems: SQL engines return all qualifying tuples; search engines retrieve all relevant documents, albeit ranked; graph databases are tasked with producing all paths connecting two nodes; query optimizers routinely explore a vast space of candidate plans; and so on. Abstractly, these tasks are formalized as enumeration problems, solved by enumeration algorithms, and studied through the lens of enumeration complexity. This talk reflects on the evolution of enumeration in database research. It will begin with a brief survey of classic complexity-theoretic notions and algorithmic techniques that play a central role in enumeration across many domains. It will then review past results on enumeration problems arising in various areas of database systems. After that, it will delve deeper into the evolution of ideas and results on answer enumeration in relational queries. It will conclude with challenges for future directions.

**  
2025**

**Querying Graph Data: Where We Are and Where To Go** \[PDF\]  
Wim Martens (University of Bayreuth)

**Abstract**  
Although graph query languages such as Cypher, SQL/PGQ, and GQL take inspiration from theoretical languages such as conjunctive regular path queries (CRPQs), their pattern matching facilities have powerful extensions in order to cope with real world use cases. Four such extensions are (1) treatment of both nodes and edges, (2) variables that bind to paths or lists, (3) path modes, and (4) data filters.

The real-world design of these features has some issues, however, that renders some natural queries inexpressible and prevents query optimization opportunities. Furthermore, they make the language difficult to study. By necessity, these issues are inherited by recent formalizations that aimed at accurately describing the standards.

We present a variant of CRPQs with the extensions (1-4), aimed to provide researchers a clean model to study, and to provide language designers inspiration for how the standards can be tweaked to overcome the aforementioned issues. In the talk (and the accompanying paper), we discuss where the design of SQL/PGQ and GQL stands today and identify a host of opportunities in research and query language design.

**  
2024**

**Recent Increments in Incremental View Maintenance** [\[PDF\]](https://sigmod.org/wp-content/uploads/2024/09/GemsPODS24-Olteanu.pdf)  
Dan Olteanu (University of Zurich)

**Abstract**  
This talk overviews recent progress on the longstanding problem of incremental view maintenance (IVM), with a focus on the fine-grained complexity and optimality of IVM for classes of conjunctive queries. This theoretical progress guided the development of IVM engines that reported practical benefits in both academic papers and industrial settings. When taken in isolation, each of the reported advancements is but a small increment. Yet when taken together, these advancements may well pave the way to a deeper understanding of the IVM problem.

**2023**

**Applications of Sketching and Pathways to Impact** [\[PDF\]](https://sigmod.org/wp-content/uploads/2024/10/gems-sketches.pdf)  
Graham Cormode (Facebook and University of Warwick)

**Abstract**  
Data summaries (a.k.a., sketches) are compact data structures that can be updated flexibly to capture certain properties of a data set. Well-known examples include set summaries (Bloom Filters) and cardinality estimators (Hyperloglog, amongst others). PODS and SIGMOD have been home to many papers on sketching, including several best paper recipients. Sketch algorithms emerged from the theoretical research community, but have found wide impact in practice. This talk will describe some of the impacts that sketches have had, from online advertising to privacy-preserving data analysis. It will consider the range of different strategies that researchers can follow to encourage the adoption of their work, and what has and has not worked for sketches.

**2022**

**Document Spanners – A Brief Overview of Concepts, Results, and Recent Developments** [\[PDF\]](https://sigmod.org/wp-content/uploads/2024/10/GemsOfPODS22_DocumentSpanners_Schweikardt.pdf)  
Nicole Schweikardt (Humboldt-University Berlin)

**Abstract**  
The information extraction framework of document spanners was introduced by Fagin, Kimelfeld, Reiss, and Vansummeren (PODS 2013, J. ACM 2015) as a formalisation of the query language AQL, which is used in IBM’s information extraction engine SystemT. Since 2013, this framework has been investigated in depth by the principles of database management community and beyond. In this talk, we give a brief overview of concepts, results, and recent developments concerning document spanners.

**  
Algorithmic Techniques for Independent Query Sampling** [\[PDF\]](https://sigmod.org/wp-content/uploads/2024/10/iqs.pdf)  
Yufei Tao (Chinese University of Hong Kong)

**Abstract**  
Unlike a reporting query that returns all the elements satisfying a predicate, query sampling returns only a sample set of those elements and has long been recognized as an important method in database systems. PODS’14 saw the introduction of independent query sampling (IQS), which extends traditional query sampling with the requirement that the sample outputs of all the queries be mutually independent. The new requirement improves the precision of query estimation, facilitates the execution of randomized algorithms, and enhances the fairness and diversity of query answers. IQS calls for new index structures because conventional indexes are designed to report complete query answers and thus becomes too expensive for extracting only a few random samples. The phenomenon has created an exciting opportunity to revisit the structure for every reporting query known in computer science. There has been considerable progress since 2014 in this direction. In this talk we distill the existing solutions into several generic techniques that, when put together, can be utilized to solve a great variety of IQS problems with attractive performance guarantees.

**2021**

**Datalog Unchained** [\[Video\]](https://www.youtube.com/watchv=v5hgpkEhTnU&list=PL3xUNnH4TdbtfsayZBft1QXOAnWluxz9G)  
Victor Vianu (UC San Diego & INRIA)

**Abstract**  
This talk reviews the development, starting at PODS 1988, of a family of Datalog-like languages with procedural, forward chaining semantics, providing an alternative to the classical declarative, model-theoretic semantics. These languages provide a unified formalism that can express important classes of queries including fixpoint, while, and all computable queries. They can also incorporate in a natural fashion updates and nondeterminism. Datalog variants with forward chaining semantics have been adopted in a variety of settings, including active databases, production systems, distributed data exchange, and data-driven reactive systems.

**  
Privacy: from Database Reconstruction to Legal Theorems** [\[Video\]](https://www.youtube.com/watch?v=8_VmU4t1jlo&list=PL3xUNnH4TdbtfsayZBft1QXOAnWluxz9G)  
Kobbi Nissim (Georgetown University)

**Abstract**  
There are significant gaps between legal and technical thinking around data privacy. As computer systems manipulating individual privacy-sensitive data become integrated in almost every aspect of society, and as such systems increasingly make decisions of legal significance, the need to bridge the legal and technical approaches becomes urgent. We formulate and prove formal claims – “legal theorems” – addressing legal questions such as whether the use of technological measures satisfies the requirements of a legal privacy standard. In particular, we analyze the notion of singling out from the GDPR and whether technologies such as k-anonymity and differential privacy prevent singling out. Our long-term goal is to develop concepts which are on one hand technical, so they can be integrated in the design of computer systems, and can be used in legal reasoning and for policymaking on the other hand.

**2020**

**Coping with Incomplete Data: Recent Advances** [\[Video\]](https://vimeo.com/450920184#t=738s)  
Leonid Libkin (University of Edinburgh/ENS-Paris/PSL)

**Abstract**  
Handling incomplete data in a correct manner is a notoriously hard problem in databases. Theoretical approaches rely on the computationally hard notion of certain answers, while practical solutions rely on ad hoc query evaluation techniques based on three-valued logic. Can we find a middle ground, and produce correct answers efficiently? The paper surveys results of the last few years motivated by this question. We re-examine the notion of certainty itself, and show that it is much more varied than previously thought. We identify cases when certain answers can be computed efficiently and, short of that, provide deterministic and probabilistic approximation schemes for them. We look at the role of three-valued logic as used in SQL query evaluation, and discuss the correctness of the choice, as well as the necessity of such a logic for producing query answers.

**  
Probabilistic Databases for All** [\[Video\]](https://vimeo.com/450920184#t=1855s)  
Dan Suciu (University of Washington)

**Abstract**  
In probabilistic databases the data is uncertain and is modeled by a probability distribution. The central problem in probabilistic databases is query evaluation, which requires performing not only traditional data processing such as joins, projections, unions, but also probabilistic inference in order to compute the probability of each item in the answer. At their core, probabilistic databases are a proposal to integrate logic with probability theory. This paper accompanies a talk given as part of the Gems of PODS series, and describes several results in probabilistic databases, explaining their significance in the broader context of model counting, probabilistic inference, and Statistical Relational Models.

**2019**

**Latent Semantic Indexings** [\[PDF\]](https://sigmod.org/wp-content/uploads/2024/09/pods2019b.pdf)  
Christos Papadimitriou (Columbia University NY)

**Abstract**  
In the late 1990s, the possibility of algorithmic extraction of insight from soulless data loomed potentially important and very intriguing. I will look back at our attempt at understanding and advancing this research program in the light of two decades of blistering progress in spectral methods, machine learning, data harvesting and deep nets.

**  
Consistent Query Answers in Inconsistent Databases** [\[PDF\]](https://databasetheory.org/sites/default/files/2019-07/slidesPods19.pdf)  
Leo Bertossi (Carleton University, Relational AI)

**Abstract**  
In this talk I will review the main concepts around database repairs and consistent query answering, with emphasis on tracing back the origin, motivation, and early developments. I will also describe some research directions that has spun from those main concepts and the original line of research. I will emphasize, in particular, fruitful and recent connections between repairs and causality in databases.

**2018**

**Reflections on Schema Mappings, Data Exchange, and Metadata Managements** [\[PDF\]](https://sigmod.org/wp-content/uploads/2024/09/pods-2018-gems.pdf)  
Phokion G. Kolaitis (UC Santa Cruz and IBM Almaden Research Center)

**Abstract**  
A schema mapping is a high-level specification of the relationship between two database schemas. For the past fifteen years, schema mappings have played an essential role in the modeling and analysis of data exchange, data integration, and related data inter-operability tasks. The aim of this talk is to critically reflect on the body of work carried out to date, describe some of the persisting challenges, and suggest directions for future work. The first part of the talk will focus on schema-mapping languages, especially on the language of GLAV (global-and-local as view) mappings and its two main sublanguages, the language of GAV (global-as-view) mappings and the language of LAV (local-as-view) mappings. After highlighting the fundamental structural properties of these languages, we will discuss how structural properties can actually characterize schema-mapping languages. The second part of the talk will focus on metadata management by considering operators on schema mappings, such as the composition operator and the inverse operator. We will discuss why richer languages are needed to express these operators, and will illustrate some of their uses in schema-mapping evolution. The third and final part of the talk will focus on the derivation of schema mappings from semantic information. In particular, we will discuss a variety of approaches for deriving schema mappings from data examples, including casting the derivation of schema mappings as an optimization problem and as a learning problem.

**  
Worst-Case Optimal Join Algorithms: Techniques, Results, and Open Problems** [\[PDF\]](https://databasetheory.org/sites/default/files/2019-05/wcoj-gems.pdf)  
Hung Q. Ngo (Relational AI)

**Abstract**  
Worst-case optimal join algorithms are the class of join algorithms whose runtime match the worst-case output size of a given join query. While the first provably worse-case optimal join algorithm was discovered relatively recently, the techniques and results surrounding these algorithms grow out of decades of research from a wide range of areas, intimately connecting graph theory, algorithms, information theory, constraint satisfaction, database theory, and geometric inequalities. These ideas are not just paperware: in addition to academic project implementations, two variations of such algorithms are the work-horse join algorithms of commercial database and data analytics engines. This paper aims to be a brief introduction to the design and analysis of worst-case optimal join algorithms. We discuss the key techniques for proving runtime and output size bounds. We particularly focus on the fascinating connection between join algorithms and information theoretic inequalities, and the idea of how one can turn a proof into an algorithm. Finally, we conclude with a representative list of fundamental open problems in this area.

**2017**

**Data Integration: From the Enterprise into Your Kitchen** [\[PDF\]](https://databasetheory.org/sites/default/files/2019-07/PODS%202017%20GEMS%20ALON.pdf)  
Alon Y. Halevy (Recruit Institute of Technology)

**Abstract**  
Twenty five years ago, data integration was a concern mainly for large enterprises with many autonomous data sources. Since then, while data integration became even more important to enterprises, the technology has ventured out into new areas, such as the Web and recently into voice-activated consumer devices that answer a plethora of questions in your home. At the core of these systems is a mechanism for describing the semantics and capabilities of individual data sources. Database theory has made important contributions to the area of modeling data sources and query answering in data integration systems. I this talk I will cover some of the main developments in the field of data integration since the mid-90’s, and discuss the challenges that lie ahead.

**  
The Semiring Framework for Database Provenance** [\[PDF\]](https://sigmod.org/wp-content/uploads/2024/09/15MayPODS.pdf)  
Val Tannen (University of Pennsylvania)

**Abstract**  
Imagine a computational process that uses a complex input consisting of multiple “items” (e.g.,files, tables, tuples, parameters, configuration rules) The provenance analysis of such a process allows us to understand how the different input items affect the output of the computation. It can be used, for example, to derive confidence in the output (given confidences in the input items), to derive the minimum access clearance for the output (given input items with different classifications), to minimize the cost of obtaining the output (given a complex input item pricing scheme). It also applies to probabilistic reasoning about an output (given input item distributions), as well as to output maintenance, and to debugging.

Provenance analysis for queries, views, database ETL tools, and schema mappings is strongly influenced by their declarative nature, providing mathematically nice descriptions of the output-inputs correlation. In a series of papers starting with PODS 2007 we have developed an algebraic framework for describing such provenance based on commutative semirings and semimodules over such semirings. So far, the framework has exploited usefully the observation that, for database provenance, data use has two flavors: joint and alternative.

Here, we have selected several insights that we consider essential for the appreciation of this framework’s nature and effectiveness and we also give some idea of its applicability.

**2016**

**Optimal Score Aggregation Algorithms** [\[PDF\]](https://sigmod.org/wp-content/uploads/2024/09/Gems-of-PODS-talk.pdf)  
Ronald Fagin (IBM Research – Almaden)

**Abstract**  
Assume that there is a set of “voters” and a set of “candidates”, where each voter assigns a numerical score to each candidate. There is a scoring function (such as the mean or the median), and a consensus ranking is obtained by applying the scoring function to each candidate’s scores. The problem is to find the top k candidates, while minimizing the number of database accesses. The speaker will present an algorithm that is optimal in an extremely strong sense: not just in the worst case or the average case, but in every case! Even though the algorithm is only 10 lines long (!), the paper containing the algorithm won the 2014 Gödel Prize, the top prize for a paper in theoretical computer science.

**  
Hypertree Decompositions: Questions and Answers** [\[PDF\]](https://databasetheory.org/sites/default/files/2016-07/HD-QA.pdf)  
Georg Gottlob (University of Oxford)

**Abstract**  
In the database context, the hypertree decomposition method is used for query optimization, whereby conjunctive queries having a low hypertree width (i.e., a low degree of cyclicity) can be recognized and decomposed automatically, and efficiently evaluated. Queries having bounded hypertree width are also highly parallelizable. Hypertree decompositions were introduced at ACM PODS 1999. This talk reviews – in form of questions and answers – the main relevant concepts and algorithms and surveys selected related work including applications and test results. The talk is accompanied by a paper of the same title authored by Georg Gottlob, Gianluigi Greco, Nicola Leone, and Francesco Scarcello.
