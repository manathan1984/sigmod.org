---
edited: true
title: "2013 SIGMOD Test of Time Award"
permalink: "/sigmod-awards/citations/2013-sigmod-test-of-time-award/"
section: "sigmod"
area: "awards"
wp_id: 367
wp_type: "page"
wp_parent: 348
updated: "2022-05-13"
---

## The Design of an Acquisitional Query Processor for Sensor Networks

### Samuel Madden, Michael J. Franklin, Joseph M. Hellerstein, Wei Hong

**Details:** This paper from the SIGMOD 2003 Conference presents a novel technique for acquisitional query processing (ACQP) in wireless sensor networks (WSNs), and its design and implementation in the TinyDB system. TinyDB runs on top of TinyOS, which has been developed by the University of California, Berkeley and now is one of the most popular embedded operating systems for WSNs. ACQP was a pioneering framework, which first addressed the issue of “When should samples for a particular query be taken?” and it has other significant features for data collection in WSNs such as low power consumption and low computational overhead, as evidenced by the huge number of citations and downloads. This paper has been highly influential in subsequent research on data collection and query processing frameworks in WSNs. Moreover, through its wide availability as TinyOS components (which are easily installed onto motes), it has been embedded in various commercial products and real sensor systems. In summary, this paper has had strong impact on both academic research and industry.

**Original abstract:** We discuss the design of an acquisitional query processor for data collection in sensor networks. Acquisitional issues are those that pertain to where, when, and how often data is physically acquired (sampled) and delivered to query processing operators. By focusing on the locations and costs of acquiring data, we are able to significantly reduce power consumption over traditional passive systems that assume the a priori existence of data. We discuss simple extensions to SQL for controlling data acquisition, and show how acquisitional issues influence query optimization, dissemination, and execution. We evaluate these issues in the context of TinyDB, a distributed query processor for smart sensor devices, and show how acquisitional techniques can provide significant reductions in power consumption on our sensor devices.

![](/wp-content/uploads/2015/07/image_thumb6.jpg)

**Samuel Madden** is a Professor of Electrical Engineering and Computer Science in MIT’s Computer Science and Artificial Intelligence Laboratory. His research interests include databases, distributed computing, and networking. Research projects include the C-Store column-oriented database system, the CarTel mobile sensor network system, and the Relational Cloud “database-as-a-service”. Madden is a leader in the emerging field of “Big Data”, heading the Intel Science and Technology Center (ISTC) for Big Data, a multi-university collaboration on developing new tools for processing massive quantities of data. He also leads BigData@CSAIL, an industry-backed initiative to unite researchers at MIT and leaders from industry to investigate the issues related to systems and algorithms for data that is high rate, massive, or very complex. Madden received his Ph.D. from the University of California at Berkeley in 2003 where he worked on the TinyDB system for data collection from sensor networks. Madden was named one of Technology Review’s Top 35 Under 35 in 2005, and is the recipient of several awards, including an NSF CAREER Award in 2004, a Sloan Foundation Fellowship in 2007, best paper awards in VLDB 2004 and 2007, and a best paper award in MobiCom 2006.

![](/wp-content/uploads/2022/05/image_thumb_franklin.gif)

**Michael J. Franklin** is a Professor of Computer Science at UC Berkeley, specializing in large-scale data management infrastructure and applications (these days called “Big Data”). He works primarily in the Database (DB) and Operating Systems and Networking Technology (OSNT) areas. He is currently Director of the Algorithms, Machines and People Lab (AMPLab) – an industry and government-supported collaboration of students, postdocs, and faculty who specialize in data management, cloud computing, statistical machine learning and other important topics necessary for making sense of vast amounts of varied and unruly data.

![](/wp-content/uploads/2022/05/image_thumb.jpg)

**Joseph M. Hellerstein** is a Chancellor’s Professor of Computer Science at the University of California, Berkeley, whose work focuses on data-centric systems and the way they drive computing. He is an ACM Fellow, an Alfred P. Sloan Research Fellow and the recipient of three ACM-SIGMOD “Test of Time” awards for his research. In 2010, Fortune Magazine included him in their list of 50 smartest people in technology , and MIT’s Technology Review magazine included his Bloom language for cloud computing on their TR10 list of the 10 technologies “most likely to change our world”. Hellerstein is the co-founder and CEO of Trifacta. He serves on the technical advisory boards of a number of computing and Internet companies including EMC, SurveyMonkey, Platfora and Captricity, and previously served as the Director of Intel Research, Berkeley.

![](/wp-content/uploads/2022/05/image_thumb_wei_hong.png)

**Wei Hong** is a senior researcher at Intel Research, Berkeley. His research focuses on data management in sensor networks. He led the Tiny Application Sensor Kit (TASK) project at Intel Research and codesigned/developed TinyDB, an open-source, in-network sensor database system with Samuel Madden. Prior to joining Intel Research, Wei co-founded and architected the products of two startup companies: Illustra Information Technology Inc. and Cohera Corp. Illustra developed the ﬁrst successful commercial Object-Relational database system. It was acquired by Informix, now part of IBM. Cohera provided electronic catalog management solutions based on a novel federated database system that it developed. Its technology was acquired by PeopleSoft. Wei earned a Ph.D. in computer science from UC Berkeley and holds a master and two bachelor degrees from Tsinghua University in Beijing, China.
