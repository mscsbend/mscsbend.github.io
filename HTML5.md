#HTML5

##What is it?
HTML5 is an abbreviation that stands for **H**yper **T**ext **M**arkup **L**anguage version **5**.

It is an extension to XML; e**X**tensible **M**arkup **L**anguage.

##Why should I care?
HTML5 is what makes up web pages, and since a Chrome application consists of web pages, we need to know how to create HTML5 content.

Let's look at XML syntax first.

An XML document is a file, that contains structured information. The structure is defined by using the following characters that have special meaning in XML:
```XML
< > / " = & # ;
```
###Elements
The `<` and `>` characters are used to define *elements*.

An element can either have content, or be empty.

An empty element must start with `<` and end with `/>`. In between is the name of the element and maybe some *attributes*, we'll get back to those.
```XML
<html />
```
The word `html` is the name of the element. An element in XML can have any name.

An element with content must first have a *start-tag* that starts with `<` and ends with `>`, then comes the content, which can be text, or other elements, and then at the end comes the *end-tag*, which starts with `</` and ends with `>`.
```XML
<html>
Some content
</html>
```

An element can have any number of *child-elements*, which can again have child-elements to any level of nexting you want.
```XML
<html>
  <head>
    <title>My first web page</title>
  </head>
  <body>
    <p>Here is a paragraph</p>
  </body>
</html>
```

It is customary to indent child-elements, but it is not neccessary. It just makes it more *pretty*, and easier to read.

Something like this is perfectly legal XML syntax:
```XML
<html><body><p>Here is a paragraph</p></body></html>
```

##Where can I find more information?
