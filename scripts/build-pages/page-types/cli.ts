import {
  PAGES_DIR,
  Page,
  buildPages
} from '../index';

import { join } from 'path';
import renderMarkdown from '../markdown-renderer';
import { commands } from '../../data/cli.json';

export default {
  title: 'Build CLI pages',
  task: () => buildPages(getCLIPages)
};

async function getCLIPages(): Promise<Page[]> {
  return commands.map(command => {
    const { name, description, summary, inputs, options, ...rest } = command;

    return {
      title: name,
      body: renderMarkdown(description),
      path: join(PAGES_DIR, `cli/commands/${name.slice(6).replace(/\s/g, '-')}.json`),
      summary: renderMarkdown(summary),
      inputs: renderInputs(inputs),
      options: renderOptions(options),
      skipIntros: true,
      ...rest
    };
  });
}

const renderInputs = inputs => inputs.map(input => ({
  ...input,
  summary: renderMarkdown(input.summary),
}));

const renderOptions = options => options.map(option => ({
  ...option,
  summary: renderMarkdown(option.summary),
}));
