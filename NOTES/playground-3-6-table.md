
# The table
The data table is not currently very accessible — it is hard for screen reader users to associate data rows and columns together, and the table also has no kind of summary to make it clear what it shows. Can you add some features to your HTML to fix this problem?


## Associate rows and columns together
- use `<thead>` tag to group all the header cells together
- use `<tbody>` tag to group all the data cells together
- use `<th>` in `<thead>` section
- use `scope` attribute to indicate for which direction (column or row) is the header

## Summary
- did not use the `summary` attribute of the `<table>`, since it's deprecated
- added the `<caption>`


## Sources
- [Table basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_table_basics#adding_headers_with_th_elements)
- [HTML table accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Table_accessibility)
- [<caption>: The Table Caption element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/caption)