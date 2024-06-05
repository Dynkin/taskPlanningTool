import React, { memo } from 'react';
import { Button, notification } from 'antd';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import hljs from 'highlight.js/lib/core';
import jsonLanguage from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', jsonLanguage);

type Props = {
  json: string;
};

const JSONPreviewComponent: React.FC<Props> = ({ json = '{}' }) => {
  const [notificationAPI, notificationContextHolder] =
    notification.useNotification();

  const highlightedCode = hljs.highlight(json, { language: 'json' }).value;

  return (
    <>
      {notificationContextHolder}
      <div className='relative mt-8 rounded-md bg-gray-200 p-8'>
        <code>
          <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </code>
        <div className='absolute right-4 top-4 flex gap-4'>
          <Button
            type='dashed'
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(json);
              notificationAPI.success({
                message: 'JSON скопирован',
                description: (
                  <div className='flex flex-col gap-4'>
                    <div>JSON успешно скопирован в буфер обмена</div>
                    <div>Можно использовать его для импорта в Jira</div>
                  </div>
                ),
              });
            }}
          >
            Скопировать
          </Button>
          <Button
            type='dashed'
            icon={<DownloadOutlined />}
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
          </Button>
        </div>
      </div>
    </>
  );
};

export const JSONPreview = memo(JSONPreviewComponent);
