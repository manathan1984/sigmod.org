---
title: "2009 SIGMOD Test of Time Award"
permalink: "/sigmod-awards/citations/2009-sigmod-test-of-time-award/"
section: "sigmod"
area: "awards"
wp_id: 361
wp_type: "page"
wp_parent: 348
updated: "2024-06-04"
---

## Approximate Computation of Multidimensional Aggregates of Sparse Data Using Wavelets

### Jeffrey Scott Vitter (Duke University, now at Texas A&M) and Min Wang (Duke University, now at IBM Thomas J. Watson)

This paper was chosen from the 1999 SIGMOD Conference that has had the most impact (research, products, methodology) over the intervening decade.

This influential paper showed that aggregates over sparse, high-dimensional arrays can be approximated with wavelets to give a compact data-cube representation that supports queries at interactive speeds. Prior histogram-based methods had prohibitive I/O costs for massive data sets of high dimensionality. The method is more accurate than random sampling and supports progressive refinement of answers when additional accuracy is desired. The paper inspired significant follow-on work by others, in the OLAP domain and also more broadly in approximate query processing, selectivity estimation, indexing of images and time series, and data-stream processing.

Abstract of the 1999 SIGMOD paper: *Computing multidimensional aggregates in high dimensions is a performance bottleneck for many OLAP applications. Obtaining the exact answer to an aggregation query can be prohibitively expensive in terms of time and/or storage space in a data warehouse environment. It is advantageous to have fast, approximate answers to OLAP aggregation queries. In this paper, we present a novel method that provides approximate answers to high-dimensional OLAP aggregation queries in massive sparse data sets in a time-efficient and space-efficient manner. We construct a compact data cube, which is an approximate and space-efficient representation of the underlying multidimensional array, based upon a multiresolution wavelet decomposition. In the on-line phase, each aggregation query can generally be answered using the compact data cube in one I/O or a small number of I/Os, depending upon the desired accuracy. We present two I/O-efficient algorithms to construct the compact data cube for the important case of sparse high-dimensional arrays, which often arise in practice. The traditional histogram methods are infeasible for the massive high-dimensional data sets in OLAP applications. Previously developed wavelet techniques are efficient only for dense data. Our on-line query processing algorithm is very fast and capable of refining answers as the user demands more accuracy. Experiments on real data show that our method provides significantly more accurate results for typical OLAP aggregation queries than other efficient approximation techniques such as random sampling.*
