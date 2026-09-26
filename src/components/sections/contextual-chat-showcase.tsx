import { Heading, Section, Stack, Text } from "@upcytech/ui";
import type { Locale } from "@/i18n/routing";
import { contextualChat as copy } from "@/content/contextual-chat";
import { chatDemoFor } from "@/content/dima-demo";
import { products } from "@/content/products";
import { ChatDemo } from "@/components/sections/chat-demo/chat-demo";

export function ContextualChatShowcase({ locale }: { locale: Locale }) {
  const product = products[0]!;
  const chat = chatDemoFor(locale);

  return (
    <Section divided aria-labelledby="contextual-chat-title">
      <Stack gap="loose">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Stack gap="tight" className="lg:col-span-8">
            <Text variant="eyebrow">{copy.eyebrow[locale]}</Text>
            <Heading level={2} variant="title" id="contextual-chat-title">{copy.title[locale]}</Heading>
            <Text variant="lede" tone="muted">{copy.intro[locale]}</Text>
          </Stack>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="font-mono text-micro uppercase tracking-[0.12em] text-muted">{copy.sample[locale]}</p>
          </div>
        </div>

        <div className="rounded-card border border-hairline bg-raised p-4">
          <p className="text-micro font-medium text-muted">{copy.contextLabel[locale]}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {copy.context[locale].map((item) => (
              <span key={item} className="rounded-chip border border-hairline bg-surface px-2.5 py-1 text-micro text-ink">{item}</span>
            ))}
          </div>
        </div>

        <ChatDemo
          copy={chat}
          locale={locale}
          product={{ name: product.name, brandKey: product.brandKey }}
        />
      </Stack>
    </Section>
  );
}
