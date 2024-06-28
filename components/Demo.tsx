import { Tab, Tabs } from "@nextui-org/react";
import { StreamingAvatar, StreamingAvatarCode } from "./StreamingAvatar";

export default function Demo() {
  const tabs = [
    {
      id: "demo",
      label: "Demo",
      content: <StreamingAvatar />,
    },
    {
      id: "code",
      label: "Code",
      content: <StreamingAvatarCode />,
    },
  ];

  return (
    <div className="w-full">
      <Tabs items={tabs}>
        {(items) => (
          <Tab key={items.id} title={items.label}>
            {items.content}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
