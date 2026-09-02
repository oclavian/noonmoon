import fs from 'fs';

let content = fs.readFileSync('src/components/ServiceDirectory.tsx', 'utf8');

// Change outer wrapper to section
content = content.replace(/<div id="bangla-services-directory-container" className="space-y-4 sm:space-y-6">/, '<section id="bangla-services-directory-container" className="space-y-4 sm:space-y-6">');
content = content.replace(/<\/div>\n    <\/div>\n  \);\n};\n/, '      </div>\n    </section>\n  );\n};\n');

// Change card wrapper to article
content = content.replace(/<div\n              key=\{service\.id\}\n              id=\{`service-card-\$\{service\.id\}`\}\n              className="group bg-white/g, '<article\n              key={service.id}\n              id={`service-card-${service.id}`}\n              className="group bg-white');

content = content.replace(/<\/div>\n            <\/div>\n          \)\)\}/g, '          </article>\n          ))}');

fs.writeFileSync('src/components/ServiceDirectory.tsx', content);
