---
layout: page
title: Blog
---
{% for post in site.posts %}
##{{ post.title }}
{{ post.date}} {{ post.excerpt }} <a href="{{ post.url}}">more</a>

{% endfor %}
