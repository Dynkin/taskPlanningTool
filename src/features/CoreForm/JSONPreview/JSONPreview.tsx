import React, { memo } from 'react';
import hljs from 'highlight.js/lib/core';
import jsonLanguage from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', jsonLanguage);

type Props = {
  json: string;
};

const JSONPreviewComponent: React.FC<Props> = ({ json = '{}' }) => {
  const highlightedCode = hljs.highlight(json, { language: 'json' }).value;

  return (
    <div className='relative mt-8 rounded-md bg-gray-200 p-8'>
      <code>
        <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </code>
      <div className='absolute right-4 top-4 flex gap-4'>
        <button
          type='button'
          className='rounded-md border border-gray-500 px-4 py-2 text-gray-500 hover:border-black hover:text-black'
          onClick={() => navigator.clipboard.writeText(json)}
        >
          Скопировать
        </button>
        <button
          type='button'
          className='rounded-md border border-gray-500 px-4 py-2 text-gray-500 hover:border-black hover:text-black'
          onClick={() => {
            const fileToSave = new Blob([json], {
              type: 'application/json;charset=utf-8',
            });

            const a = document.createElement('a');
            a.href = URL.createObjectURL(fileToSave);
            a.download = 'tasks.json';
            a.click();
            a.remove();
          }}
        >
          Скачать
        </button>
      </div>
    </div>
  );
};

export const JSONPreview = memo(JSONPreviewComponent);
