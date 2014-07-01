css_selector
============

This is just a temporary repository for this project.

#How it works?
This CSS selector first splits the whole selector into a list of selectors, and then finds a match. It goes from right to left (Ref: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS).

#Possible improvements?

Validation could be added. Also to cover all the cases we would need to build some complex regexps like Sizzle does (Ref: https://github.com/jquery/sizzle/blob/master/src/sizzle.js).

Other ref: http://www.w3.org/TR/CSS2/grammar.html

This CSS selector only works for the most common cases. For the cases like 'E F' where F is a child of E we would need to traverse through the parents to find a match for E.
The code could be continuously refactored, but currently it meets the requirements.

Ognjen Bubalo