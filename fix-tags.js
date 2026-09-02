import fs from 'fs';

let content = fs.readFileSync('src/components/ServiceDirectory.tsx', 'utf8');

// I need to find `<article` and its matching `</div>` at the end of the map.
// The map looks like this:
// {filteredServices.map((service, index) => {
// ... return (
// <article ...>
// ...
// </div>
// );

content = content.replace(/<\/div>\n            \);\n          \}\)\}/g, '</article>\n            );\n          })}');
content = content.replace(/<\/div>\n  \);\n\};\n/g, '</section>\n  );\n};\n');

// Also there was a mistake in the first replace maybe? Let's check where the section tag ends.
fs.writeFileSync('src/components/ServiceDirectory.tsx', content);
