import {
  PAGES_DIR,
  Page,
  buildPages
} from '../index';

import plugins from '../../data/native.json';
import renderMarkdown from '../markdown-renderer';
import { join } from 'path';

export default {
  title: 'Build native pages',
  task: () => buildPages(getNativePages)
};

async function getNativePages(): Promise<Page[]> {
  return plugins.map(plugin => {
    const title = plugin.displayName.trim();
    const path = `${join(PAGES_DIR, 'native', plugin.name.slice(14))}.json`;
    const { description, usage, repo, platforms } = plugin;
    return {
      title,
      path,
      body: description,
      repo,
      platforms,
      usage: usage ? renderMarkdown(usage) : null,
      package: plugin.name,
      cordova: plugin.cordovaPlugin.name
    };
  });
}
