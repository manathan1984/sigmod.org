---
edited: true
title: "2008 SIGMOD Test of Time Award"
permalink: "/sigmod-awards/citations/2008-sigmod-test-of-time-award/"
section: "sigmod"
area: "awards"
wp_id: 359
wp_type: "page"
wp_parent: 348
updated: "2022-05-13"
---

## Integration of Heterogeneous Databases Without Common Domains Using Queries Based on Textual Similarity

### ![image_preview27.jpg (125×150)](/wp-content/uploads/2015/07/image_preview27.jpg)     William W. Cohen (AT&T Labs-Research)

This landmark paper on data integration established the importance of data-driven (as opposed to schema-driven) methods, and opened up the important field of text-similarity joins. Prior to this paper, the literature on heterogeneous databases had focused on schema-centric approaches assuming a unified representation of individual entities. This work was the first database-research publication that addressed the entity-matching problem as a core issue of data integration. Its query-time approach to partial integration anticipated the modern notion of pay-as-you-go dataspaces.

Abstract of the 1998 SIGMOD paper: *Most databases contain “name constants” like course numbers, personal names, and place names that correspond to entities in the real world. Previous work in integration of heterogeneous databases has assumed that local name constants can be mapped into an appropriate global domain by normalization. However, in many cases, this assumption does not hold; determining if two name constants should be considered identical can require detailed knowledge of the world, the purpose of the user’s query, or both. In this paper, we reject the assumption that global domains can be easily constructed, and assume instead that the names are given in natural language text. We then propose a logic called WHIRL which reasons explicitly about the similarity of local names, as measured using the vector-space model commonly adopted in statistical information retrieval. We describe an efficient implementation of WHIRL and evaluate it experimentally on data extracted from the World Wide Web. We show that WHIRL is much faster than naive inference methods, even for short queries. We also show that inferences made by WHIRL are surprisingly accurate, equaling the accuracy of hand-coded normalization routines on one benchmark problem, and outperforming exact matching with a plausible global domain on a second.*
