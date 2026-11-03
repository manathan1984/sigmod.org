---
edited: true
title: "PODS 30th Anniversary Statistics"
permalink: "/pods-home/pods-30th-anniversary-statistics/"
section: "pods"
area: "pods"
wp_id: 392
wp_type: "page"
wp_parent: 390
updated: "2015-07-17"
---

This page contains pointers to the raw data that was gathered for the analysis performed in “30 Years of PODS in Facts and Figures”.

Download the code and data [here](/wp-content/uploads/2015/07/30_years_of_pods.tar_.gz "PODS30 - 30 years of pods code and data").

## Required Python packages

-   NetworkX (http://networkx.lanl.gov/)
-   BeautifulSoup (http://www.crummy.com/software/BeautifulSoup/)

## Loading author and conference data

To quickly get started with exploring the different graphs, we included two pickled dictionaries that contain all the data we scraped from DBLP (retrieved at 2011-08-06). These files can be loaded as follows:

```
$ python
>>> execfile('create_pods_graphs.py')
>>> authors = cPickle.load(open('authors.pkl'))
>>> confs = cPickle.load(open('confs.pkl'))
```

If you would like to re-scrape DBLP (and thus update the author and conf dicts), execute the following function:

```
>>> confs, authors = get_confs_and_authors()
```

## Constructing the graphs

For the article we constructed two types of graphs: separate graphs for each conference year, and cumulative graphs.

To construct the yearly conference graphs:

```
>>> graphs = create_graph_per_conf(confs)
```

To construct the cumulative graphs:

```
>>> cumugraphs = create_cumulative_graphs_per_year(confs)
```

## Calculating network statistics

To generate a CSV file of all network statistics mentioned in the paper, use the following function:

```
>>> create_genral_stat_csv(confgraphs, authors, confs)
```

Here are the `confgraphs` contain the (cumulative) graphs per year. The `authors` and `confs` contain all conference data obtained by loading the pickles or by scraping DBLP.
