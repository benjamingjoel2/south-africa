/** Locale build settings for scripts/i18n-build.mjs. */
import fs from 'node:fs';
import path from 'node:path';

const config = {
  locales: ['fr', 'de', 'es'],
  enAppDir: 'app/(en)',
  sharedDirs: ['components', 'lib', 'data', 'config'],
  // Blog posts: read the translated MDX copied to .i18n/<locale>/content.
  after(locale, root) {
    const f = path.join(root, '.i18n', locale, 'lib', 'blog.ts');
    const src = fs.readFileSync(f, 'utf8');
    fs.writeFileSync(f, src.replace('path.join(process.cwd(), "content", "blog")', `path.join(process.cwd(), ".i18n", "${locale}", "content", "blog")`));
  },
};

export default config;
