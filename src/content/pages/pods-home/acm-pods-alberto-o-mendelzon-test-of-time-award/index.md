---
title: "ACM PODS Alberto O. Mendelzon Test-of-Time Award"
permalink: "/pods-home/acm-pods-alberto-o-mendelzon-test-of-time-award/"
section: "pods"
area: "pods"
wp_id: 391
wp_type: "page"
wp_parent: 390
updated: "2026-05-27"
---

[Alberto O. Mendelzon](http://www.cs.toronto.edu/~mendel) was an international leader in the principles of database systems. His pioneering work on database dependencies has been influential in both the theory and practice of data management. His work has inspired research and practice in database design, query processing, and data integration. He made fundamental contributions in the areas of graphical and visual query languages, knowledge-base systems, and online-analytic processing. His work has provided the foundation for languages used to search web data. The volume of these applications is a testament to the truly foundational nature of his results.

Mendelzon was a Professor of Computer Science at the University of Toronto and a Fellow of the Royal Society of Canada. He was selected by the top organizations in database research to chair or co-chair ten program committees of major conferences that span the entire spectrum of database research, from theory (including PODS), to systems (for example, VLDB), to emerging areas (for example, the WWW conference). Mendelzon served as General Chair of the PODS conference from 1997 to 1999. In addition to being a leader of the database community, Mendelzon was an outstanding educator, who guided the research of 19 doctoral students and of numerous postdoctoral fellows until he passed away in June 2005.

The ACM PODS Alberto O. Mendelzon Test-of-Time Award was established in 2007 and was awarded for the first time in 2008. It is awarded every year to a paper or a small number of papers published in the PODS proceedings ten years prior that had the most impact in terms of research, methodology, or transfer to practice over the intervening decade. Each year, the winner(s) of the ACM PODS Alberto O. Mendelzon Test-of-Time Award receive plaques and the sum of $1,000 (divided equally among the winners, if more than one). The award is funded by a generous gift from IBM.

### Recipients of the ACM PODS Alberto O. Mendelzon Test-of-Time Award:

## 2026

The 2026 Award Committee selected the following paper as the award winner:

-   Mahmoud Abo Khamis, Hung Q. Ngo, and Atri Rudra: [FAQ: Questions Asked Frequently.](https://dl.acm.org/doi/10.1145/2902251.2902280)  
    We define and study the Functional Aggregate Query (FAQ) problem, which encompasses many frequently asked questions in constraint satisfaction, databases, matrix operations, probabilistic graphical models and logic. This is our main conceptual contribution. We then present a simple algorithm called “InsideOut” to solve this general problem. InsideOut is a variation of the traditional dynamic programming approach for constraint programming based on variable elimination. Our variation adds a couple of simple twists to basic variable elimination in order to deal with the generality of FAQ, to take full advantage of Grohe and Marx’s fractional edge cover framework, and of the analysis of recent worst-case optimal relational join algorithms. As is the case with constraint programming and graphical model inference, to make InsideOut run efficiently we need to solve an optimization problem to compute an appropriate variable ordering. The main technical contribution of this work is a precise characterization of when a variable ordering is \`semantically equivalent’ to the variable ordering given by the input FAQ expression. Then, we design an approximation algorithm to find an equivalent variable ordering that has the best \`fractional FAQ-width’. Our results imply a host of known and a few new results in graphical model inference, matrix operations, relational joins, and logic. We also briefly explain how recent algorithms on beyond worst-case analysis for joins and those for solving SAT and #SAT can be viewed as variable elimination to solve FAQ over compactly represented input functions.

## 2025

The 2025 Award Committee consisted of Diego Calvanese (Chair, PODS 2015 PC Chair), Graham Cormode, and Leonid Libkin. They selected the following paper as the award winner:

-   Mahmoud Abo Khamis, Hung Q. Ngo, Christopher Ré, and Atri Rudra: [Joins via Geometric Resolutions: Worst-case and Beyond.](https://dl.acm.org/doi/10.1145/2745754.2745776)  
    We present a simple geometric framework for the relational join. Using this framework, we design an algorithm that achieves the fractional hypertree-width bound, which generalizes classical and recent worst-case algorithmic results on computing joins. In addition, we use our framework and the same algorithm to show a series of what are colloquially known as beyond worst-case results. The framework allows us to prove results for data stored in Btrees, multidimensional data structures, and even multiple indices per table. A key idea in our framework is formalizing the inference one does with an index as a type of geometric resolution; transforming the algorithmic problem of computing joins to a geometric problem. Our notion of geometric resolution can be viewed as a geometric analog of logical resolution. In addition to the geometry and logic connections, our algorithm can also be thought of as backtracking search with memoization.

## 2024

The 2024 Award Committee consisted of Jan van den Bussche, Ke Yi, and Martin Grohe (chair). They selected the following paper as the award winner:

-   Piotr Indyk, Sepideh Mahabadi, Mohammad Mahdian, and Vahab S. Mirrokni: [Composable Core-sets for Diversity and Coverage Maximization.](https://dl.acm.org/doi/10.1145/2594538.2594560)  
    A coreset for a point set in a metric space is a subset of the point set such that certain characteristics of the original set  
    can be approximated from the coreset alone. This is powerful tool is especially useful on massive data, reducing both the space  
    and time cost for various problems significantly, including many diversity and coverage problems. However, the previous  
    coreset constructions for these problems did not produce composable coresets for these problems. Composability refers to the  
    property that an approximate solution to a union of a collection of sets can be obtained from the coresets of the individual  
    sets in the collection. This is is an important property that allows the coreset to be used over massive distributed data. By  
    integrating elements from existing algorithms with innovative new ideas, this paper tackles the challenge of constructing  
    almost optimal composable coresets for a wide range of diversity and coverage problems, thus offering a comprehensive  
    solution with significant impact on subsequent developments.

## 2023

The 2023 Award Committee selected the following two papers as the award winners:

-   Paul Beame, Paraschos Koutris, and Dan Suciu: [Communication Steps for Parallel Query Processing.](https://dl.acm.org/doi/10.1145/2463664.2465224)  
    The first paper introduces the Massively Parallel Communication (MPC) model to analyze the tradeoff between the number of rounds and the amount of communication required in a massively parallel computing environment. A decade ago there was a growing interest in the study of data processing on large distributed clusters, which resulted in the introduction of various models focusing on different aspects.  
    The MPC model can be seen as the culmination of these models and was designed as an abstraction for the shared-nothing architecture which remains the architecture used by large data processing systems today. Since then, the MPC model is widely adopted in the literature. In the paper, the authors obtain both lower and upper bounds for computing full conjunctive queries in the one round and multi-round case. In particular, they discover an interesting connection between the number of bits that are required to be sent in the single-round case for computing a conjunctive query and the fractional vertex covering number of the hypergraph associated to that query. The monograph “Algorithmic Aspects of Parallel Data Processing” in Foundations and Trends in Databases (2018) presents a detailed overview of the research on the MPC model since its introduction.
-   Meghyn Bienvenu, Balder ten Cate, Carsten Lutz, and Frank Wolter: [Ontology-based data access: a study through disjunctive datalog, CSP, and MMSNP.](https://dl.acm.org/doi/10.1145/2463664.2465223)  
    Ontology-based data access (OBDA) provides a formalization of the problem of querying a database enhanced with an ontology. This simple formal model provides a unifying view for problems in many different areas, and in particular for the widely studied  
    issue of extracting information from a knowledge graph. As such, OBDA has been extensively studied, mainly following two lines of research: the development of efficient query answering algorithms for some classes of query and ontology languages, and the characterization of combinations of these two elements that lead to intractability. In the second paper, the authors follow a different path to study OBDA, which has brought new tools to the area and, as such, has become a fruitful way to address the fundamental challenges in OBDA. More precisely, the authors consider the expressive power of the settings used in OBDA, whose main parameters are the query and ontology languages, and establish tight connections of such settings with some natural fragments and extensions of disjunctive Datalog, and with constraint satisfaction problems and their logical generalization Monotone Monadic Strict NP (MMSNP). In this way, the authors open the possibility of transferring techniques and results obtained in the study of disjunctive Datalog and constraint satisfaction problems to the study of OBDA. In fact, the authors show the great advantages of the proposed approach by providing new results in OBDA on query rewriting, PTIME/NP query answering dichotomies, and query containment.  
    

## 2022

The 2022 Award Committee consisted of Michael Benedikt (chair), Michael Bender, and Sudeepa Roy. They selected the following two papers as the award winners:

-   Hung Q. Ngo, Ely Porat, Christopher Ré, and Atri Rudra: [Worst-case optimal join algorithms.](https://dl.acm.org/doi/10.1145/2213556.2213565)  
    This paper took research on a fundamental problem in database research – join query processing – in a new direction. Its motivation was the bound on join query size of Atserias, Grohe, and Marx, now known as the AGM bound (FOCS 2008). This raised the question of whether a join algorithm can achieve a worst-case running time in line with this bound. This paper presents an algorithm that achieves this bound, while showing that traditional query plans cannot achieve it. In the process, they connect join processing questions with geometric inequalities, a connection that has proven fruitful in subsequent work. The algorithmic contribution in this paper almost immediately resonated within database applications when it was observed that a join algorithm recently implemented in industry, Leapfrog Triejoin, achieves a similar optimality guarantee. This led to a line of papers and implementations of join algorithms building off the ideas in the paper. The contribution of the paper to analysis of join queries has arguably been more profound – the connection between join query processing, geometric inequalities, and worst-case size bounds have been subsequently explored in many other contexts, including in the presence of integrity constraints. This work has already been honored with a “Gems of PODS” talk in PODS 2018: the conference paper, journal paper in JACM, and SIGMOD record survey article discussing later developments are all highly cited. This underlines the fact that this paper represented a major departure point for research in database theory.
-   Pankaj Agarwal, Graham Cormode, Zenfeng Huang, Jeff M. Phillips, Zhewei Wei, and Ke Yi: [Mergeable Summaries.](https://dl.acm.org/doi/10.1145/2213556.2213562)  
    In a streaming setting, databases receive a stream of updates, and a standard approach is to maintain a compressed representation – a sketch – of the data, updating it on-the-flywhile also supporting queries. In practice, data is partitioned along many axes, with separate streams being maintained. To support queries that require aggregation over many substreams, we may need to perform a merge operation on substreams without increasing error bounds. This paper initiated the study of mergeability of sketching methods. This included analysing the mergeability of the popular existing summaries, and developing new mergeable sketching algorithmsfor quantiles, an aggregate that is important in industry, and also for heavyhitters and geometric summaries. The impact within streaming implementations has been extremely significant: mergeability is now an essential property of sketches, and stands as a core principle of the Apache Data Sketches project as well as other products in industry. The paper has also proved increasingly influential within academic research, both within databases and algorithms. Follow-ups include the best paper award winning paper at PODS ’21. Overall, this paper has represented an important new direction both for theory and industry.

## 2021

The 2021 Award Committee consisted of Thomas Schwentick (PC chair of PODS 2011), Angela Bonifati, and Rasmus Pagh. They selected the following paper as the award winner for the 2021 ACM PODS Alberto. O. Mendelzon Test-of-Time Award:

-   Hossein Jowhari, Mert Saglam, and Gábor Tardos: [Tight bounds for Lp samplers, finding duplicates in streams, and related problems.](https://dl.acm.org/doi/10.1145/1989284.1989289)  
    This paper addresses how to maintain a sample of a dynamically changing database, where data items may be inserted and deleted, while using space much smaller than the size of the database. Monemizadeh and Woodruff had shown in 2010 that it is possible to perform such so-called Lp sampling in a stream using polylogarithmic space. The PODS 2011 paper of Jowhari, Saglam and Tardos presented algorithms with improved (and as was partially shown later, basically tight) space usage, and has had a considerable impact on the design of algorithms in streaming and distributed models of computation.

## 2020

The 2020 Award Committee consisted of Dirk Van Gucht (chair), Georg Gottlob and Jan Van Den Bussche. They selected the following paper as the award winner for the 2020 ACM PODS Alberto. O. Mendelzon Test-of-Time Award:

-   Chao Li, Michael Hay, Vibhor Rastogi, Gerome Miklau and Andrew McGregor: [Optimizing Linear Counting Queries under Differential Privacy](https://dl.acm.org/doi/10.1145/1807085.1807104)  
    This paper builds on the theory of differential privacy as a robust privacy standard in data disclosure-avoidance applications. Its main contribution is a matrix mechanism that leads to a two-phase algorithm for answering large workloads of correlated counting (statistical) queries. Correlation among queries is undesirable as it necessitates increasing the magnitude of noise to keep data private, thus decreasing the quality of query answers. The proposed method considers in its first phase a strategy workload, which differs from the given query-workload. The noisy response to various such  
    strategy-workloads goes, in a second-phase, through an optimization process which then yields a quality answer for the initial query-workload. This matrix mechanism has been fundamental to further developments in the field. Most notably is the adoption of the approach as the data-privacy mechanism in the United States 2020 Census. The paper received about 300 citations, both in database theory and data systems papers, underscoring its additional impact. Furthermore, it received numerous nominations from the community.

## 2019

The 2019 Award Committee consisted of Victor Vianu (chair), Jianwen Su and Dirk Van Gucht. They selected the following paper as the award winner for the 2019 ACM PODS Alberto. O. Mendelzon Test-of-Time Award:

-   Andrea Cali, Georg Gottlob and Thomas Lukasiewicz: [A General Datalog-Based Framework for Tractable Query Answering over Ontologies](https://dl.acm.org/citation.cfm?id=1559809)  
    This paper introduces and studies the Datalog+- framework for query answering over ontologies, which subsequently became highly influential in both the database and knowledge representation communities. Its main contribution is an in-depth study of the data complexity of Datalog+-, and several extensions and restrictions tailored to ontologies. The paper identifies a tractable family of Datalog+- formalisms, based on linear tuple-generating dependencies, that generalizes description logics of the DL-Lite family.  Extensions with keys and stratified negation are also studied. Other technical results of the paper concerning the chase have been fundamental to further developments in the field. The paper received over 450 citations, evidencing its significant impact.

## 2018

The 2018 Award Committee consisted of Maurizio Lenzerini, Wim Martens and Nicole Schweikardt. After careful consideration and having solicited external nominations and advice, they selected the following paper as the award winner for the 2018 ACM PODS Alberto. O. Mendelzon Test-of-Time Award:

-   Alin Deutsch, Alan Nash and Jeff Remmel: [The Chase Revisited](https://dl.acm.org/citation.cfm?id=1376938)  
    The chase procedure, introduced in the ’70s, is a famous technique in the field and has been proved to be important and effective in providing solutions to several problems related to reasoning on data. The paper revisits the standard chase procedure, studying its properties and applicability to classical database problems. Beside settling the open problem of decidability of termination of the standard chase, it investigates the adequacy of the standard chase for a number of data-oriented tasks. The conceptual insight provided by the paper and the technical results presented go much deeper than the modest title of the paper may suggest. They have had a huge impact on the research work carried out in several topics of data management and knowledge bases, including checking query containment under constraints, constraint implication, computing certain answers in data exchange and data integration, query answering in Datalog and its extensions, and ontology-based data access.

## 2017

The 2017 Award Committee consisted of Leonid Libkin and Moshe Y. Vardi. After careful consideration and having solicited external nominations and advice, they have decided to select the following paper as the award winner for the 2017 ACM PODS Alberto. O. Mendelzon Test-of-Time Award:

-   Todd J. Green, Grigoris Karvounarakis, and Val Tannen: [Provenance Semirings](https://doi.org/10.1145/1265530.1265535)  
    In the mid 1990s, Stefano Bistarelli, Ugo Montanari, and Francesca Rossi discovered an elegant framework for constraint solving based on assigning constraints values in a semiring; it accounted, in a uniform way, for several hitherto different approaches to constraint solving. In their PODS 2007 paper, titled “Provenance semirings”, Green, Karvounarakis, and Tannen demonstrated, via a collection of well chosen examples, that the same idea is applicable in database theory: they used the semiring approach to capture in a uniform way a variety of scenarios where unions of conjunctive queries or datalog queries are posed over relational databases. These included incomplete and probabilistic databases, and computing provenance of tuples by using well known and studied semirings. After the publication of PODS 2007 paper, the semiring approach was adopted by the database community; it was extended to more expressive queries and was used in provenance applications as well as in applications related to incomplete and probabilistic data and causality in databases. The paper has gathered over 500 citations, giving evidence to its broad impact.

## 2016

The 2016 Award Committee consisted of Marcelo Arenas, Peter Buneman, and Jan Van den Bussche. After careful consideration and listening to external nominations and advice, they decided to select the following paper, which was published in PODS 2006, as the award winner for 2016 ACM PODS Alberto. O. Mendelzon Test-of-Time Award:

-   Mikołaj Bojańczyk, Claire David, Anca Muscholl, Thomas Schwentick, and Luc Segoufin. [Two-variable logic on data trees and XML reasoning](http://dx.doi.org/10.1145/1142351.1142354)  
    The authors introduced an influential new approach to the modeling of XML trees with data values. This means that not only purely structural queries, but also queries involving joins can be modeled. The new approach unifies earlier results, and has led to many new results, on the automated verification of XML queries under integrity constraints. The paper has been highly influential both in database and automata theory. Because database theory research on XML has greatly benefitted from an automata-theoretic approach, it is satisfying to see the circle completed in this respect.

## 2015

The 2015 Award Committee consisted of Foto Afrati, Frank Neven, and Dan Suciu decided to award the following papers from the 2005 PODS proceedings:

-   Michael Benedikt, Wenfei Fan, and Floris Geerts. [XPath Satisfiability in the Presence of DTDs](http://doi.acm.org/10.1145/1065167.1065172)  
    The paper studies the satisfiability problem for XPath queries under schema constraints. The satisfiability problem is a classical problem associated with query languages, and the query languages considered in this paper represent tree pattern languages of universal interest. The paper considers an exhaustive combination of query languages and schema formalism, establishing tight complexity bounds for the satisfiability problem. The conference paper, and its full version published in the Journal of the ACM three years later, contain a treasure trove of complexity results and proof techniques, most of which are state of the art today. The proofs are technically sophisticated, yet a pleasure to read. The paper has a large number of citations, has influenced many researchers, and it is considered today the standard reference for complexity results on the satisfiability problem for XPath expressions.
-   Luc Segoufin and Victor Vianu. [Views and Queries: Determinacy and Rewriting](http://doi.acm.org/10.1145/1065167.1065174)  
    Prior to this paper there had been considerable research activity on rewriting queries using views, which is a fundamental problem in databases. But all prior work had been confined to algorithms for finding such rewritings. This paper marks a complete conceptual shift in looking at the problem, focusing attention for the first time on the question of when rewritings exist, regardless of whether one can find them. The paper introduces the right conceptual framework for studying one of the most important problems in database theory, by defining formally the notion of determinacy. It also establishes several key theoretical results, demonstrating both the elegance and the depth of the notion of determinacy, and pointing to the general direction of how determinacy should be studied in the future. Today, the notion of determinacy, as defined by this paper, has been widely adopted by the theoretical database community, and has motivated several followup studies, ranging from work on the problem of decidability of FO rewritability to decidability results for restricted classes of queries.

## 2014

The 2014 Award Committee consisted of Wenfei Fan (chair), Floris Geerts, and Dan Suciu and decided to award the following papers from the 2004 PODS proceedings:

-   Ronald Fagin, Phokion G. Kolaitis, Lucian Popa, and Wang Chiew Tan. [Composing schema mappings: Second-order dependencies to the rescue](http://doi.acm.org/10.1145/1055558.1055572)  
    The paper proposed a general semantics for composing schema mappings. Schema mappings study how the data from one application is to be mapped to another with a different data format, typically specified  by source-to-target tuple-generating dependencies (st-tgds). The paper proved that the composition of st-tgd mappings is not necessarily an st-tgd mapping. In light of this impossibility result, it introduced the language of second-order st-tgds (SO-tgds), and showed that the class of mappings defined by SO-tgds is closed under composition. Moreover, it showed that this class preserves good properties of st-tgds for data exchange. It also proved that every SO-tgd defines the composition of a finite number of st-tgd mappings. This definition of the composition operator for schema mappings has been adopted as a standard in the area of data exchange.
-   Claudio Gutierrez, Carlos A. Hurtado, and Alberto O. Mendelzon. [Foundations of semantic web databases](http://doi.acm.org/10.1145/1055558.1055573)  
    This paper was the first paper in PODS about semantic Web databases, and was among the first efforts to study fundamental problems associated with RDF graphs pre-dating SPARQL. It provided clean, elegant and simple formalizations of the main concepts related to the use of blank nodes and  RDFS vocabulary in RDF, formalized the inference and query answering problems for RDF in this general context, and established the computational complexity of these problems. This paper was instrumental in bringing traditional database techniques into semantic Web, showing how fundamental theoretical results in database theory can be carried over to an important domain.

Both papers have received hundreds of citations, and have had an impact on subsequent research on data exchange and semantic Web databases, respectively. In particular, the Test-of-Time Award for the second paper is a posthumous recognition of the great work of the late Alberto O. Mendelzon.

## 2013

The 2013 Award Committee consisted of Michael Benedikt, Tova Milo, and Dirk Van Gucht and decided to award the following paper from the 2003 PODS proceedings:

-   Irit Dinur and Kobbi Nissim. [Revealing information while preserving privacy](http://doi.acm.org/10.1145/773153.773173)  
    This paper dealt with the following fundamental question: given a system holding a database with sensitive data, how many queries can it permit to be answered, and with what accuracy, while preserving the privacy of the data? A database is modeled by an n-bitstring d1,..,dn with a query being a subset q of {1,…,n}. The answer to q is deﬁned as the sum of all database entries speciﬁed by q. When q is issued, the system itself will return this answer perturbed by some random noise. Relative to this setting, Dinur and Nissim established the following fundamental, but negative, result: If, for each query, the system’s added noise is bounded by o(sqrt(n)), then an adversary can almost entirely reconstruct the database from the answers of just O(n log^2(n)) randomly selected queries. Furthermore, the reconstruction can be done in polynomial time. Fortunately, for very large n, obtaining answers to O(n log^2(n)) queries may be prohibitively expensive. What would happen if only a sublinear number of queries is allowed? This problem was addressed in the second part of the paper. This led to positive results for a very strong notion of privacy, which would, through the work of additional researchers, evolve into what is now known as “differential privacy.” The Dinur-Nissim paper has received hundreds of citations. It has had a fundamental impact on the theory and practice of private data analysis. Furthermore, it was the seed for the development of differential privacy.

## 2012

The 2012 Award Committee consisted of Richard Hull, Phokion G. Kolaitis, and Dirk Van Gucht and decided to award the following paper from the 2002 PODS proceedings:

-   Gerome Miklau and Dan Suciu. [Containment and Equivalence for an XPath Fragment](http://dx.doi.org/10.1145/543613.543623)  
    The paper studied static analysis problems for XPath, a query language at the core of processing XML documents and XML document databases. XPath, an important paradigm of a query language for semi-structured data, is designed with tree-navigation in mind and supports such navigation along three axes: ancestor-descendant, branching, and wildcards. In this paper, Miklau and Suciu established that if all three axes are allowed, then the query containment problem for XPath queries is coNP-complete. Furthermore, this intractability persists even when certain tight bounds on the number of wildcards and the number of branches are imposed. These results shed light on the boundary between tractability and intractability for XPath query containment, since it was previously known that the containment problem was solvable in polynomial time for XPath queries in which any two of the three axes are allowed. Both the paper in the PODS 2002 proceedings and its subsequent full version in the Journal of the Association for Computing Machinery have received hundreds of citations each. Moreover, this work initiated a fruitful line of research on the static analysis of XML query languages that brought together researchers from database theory and automata theory.

## 2011

The 2011 Award Committee consisted of Peter Buneman, Meral Ozsoyoglu, and Jianwen Su and decided to award the following paper from the 2001 PODS proceedings:

-   Ronald Fagin, Amnon Lotem, and Moni Naor. [Optimal Aggregation Algorithms for Middleware](http://dx.doi.org/10.1145/375551.375567)  
    The paper investigates a very important problem that originates in multimedia databases: Given a set of objects with grades (rankings) on many attributes, find the objects with the best overall combined grades under some monotone combining function such as min or average. The paper presents a very simple algorithm, called Threshold Algorithm, and proves that it is essentially optimal (in finding the best overall grades) for all monotone functions and over every database. Furthermore, the algorithm only requires a small constant-size buffer. The paper also gives adaptation of the algorithm for situations such as no random accesses. The Threshold Algorithm has been used in a wide range of applications where the problem naturally occurs, from databases with traditional and non-traditional types of data (music, video, text, uncertain data, etc.) to social networks, sensor networks, etc. The paper is among the most highly cited papers in PODS 2001, and perhaps all time.

The paper has clearly had a major influence on the database and other research communities. Hence, the committee found it to be entirely worthy of this Award.

## 2010

The 2010 Award Committee consisted of Phokion G. Kolaitis and Jianwen Su and decided to award the  
following papers from the 2000 PODS proceedings:

-   Tova Milo, Dan Suciu, and Victor Vianu. [Typechecking for XML Transformers](http://doi.acm.org/10.1145/335168.335171)  
    The paper studied the problem of checking whether or not an XML transformation (e.g., specified in XSLT and in other languages) is well typed: for every input document of a given DTD, the result document always conforms to another specified DTD. The problem is essential for manipulating XML documents. The main result of the paper is that the problem is decidable. A key ingredient in obtaining this result was the introduction and study of a new tree-transducer model with pebbles that serves as an abstraction of XML transformations.
-   Wenfei Fan and Jerome Simeon. [Integrity Constraints for XML](http://doi.acm.org/10.1145/335168.335172)  
    The paper investigated integrity constraints for XML DTDs, including keys, foreign keys, inverse constraints, and inclusion dependencies. The technical results concern the implication and finite implication problems for the constraints. Clearly, integrity constraints and, in particular, the types studied in this paper, are an essential part of XML data modeling in a variety of contexts, including data management and software engineering. The undecidability, decidability, and complexity results provide a guidance and basis for dealing with integrity constraints in practice.

Both papers are extensively cited in the literature, and both had a major influence on the methodology and direction of subsequent research on XML data modeling and management. Hence, the committee has found both to be worthy of this Award.

## 2009

The 2009 Award Committee consisted of Catriel Beeri (Chair), Phokion G. Kolaitis, and Christos H. Papadimitriou and decided to award the following paper from the 1999 PODS proceedings:

-   Georg Gottlob, Nicola Leone, and Francesco Scarcello. [Hypertree Decompositions and Tractable Queries](http://doi.acm.org/10.1145/303976.303979)  
    The paper deals with a central problem in database research, namely finding classes of conjunctive queries for which problems, such as the evaluation of Boolean queries and query containment, are in polynomial time. This problem has attracted a lot of attention since the pioneering work of Yanakakis on acyclic queries. The paper shows that the earlier notion of bounded query width (introduced by Chekuri and Rajaraman in ICDT 97) is NP-hard, introduces the notion of bounded hypertree width, then shows that this notion properly generalizes earlier notions of acyclicity, that constant hypertree width is efficiently recognizable, and that Boolean queries with constant hypertree width can be efficiently evaluated. The results of the paper are applicable to both conjunctive query evaluation and to constraint satisfaction.

The paper is extensively cited in the literature, and had an impact on subsequent research on these two problems. Hence, the committee has found it to be worthy of the Award.

## 2008

The 2008 Award Committee consisted of Catriel Beeri (Chair), Georg Gottlob, and Jan Paredaens. The Award Committee selected the following two papers from the 1998 PODS proceedings as the award winners for 2008:

-   Serge Abiteboul and Oliver M. Duschka. [Complexity of Answering Queries Using Materialized Views](http://doi.acm.org/10.1145/275487.275516)  
    This paper dealt with a central problem in database research, with numerous applications in data management. It provided a conceptual framework and a terminology for the problem, and presented a comprehensive analysis of its complexity.
-   Phokion G. Kolaitis and Moshe Y. Vardi. [Conjunctive-Query Containment and Constraint Satisfaction](http://doi.acm.org/10.1145/275487.275511)  
    This paper investigated the relationship between two fundamental and extensively studied problems from the database and artificial intelligence areas, respectively. It showed that the two problems are equivalent, and investigated conditions that guarantee polynomial-time solutions, explaining in particular, many previously known polynomial time solutions.

Both papers are extensively cited in the literature, and both had a major influence on the methodology and direction of subsequent research. Hence, the committee has found both to be worthy of the Award. The committee notes that the nomination of these two papers as first winners of the Alberto O. Mendelzon Award is particularly appropriate, since both deal with problems very closely related to his research interests.
