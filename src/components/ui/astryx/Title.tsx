import { Divider, Text, HStack } from "@astryxdesign/core";

export default function Title({ text }: { text: string }) {
  return (
    <>
      <HStack width="100%" gap={8} justify="between" align="center">
        <Divider orientation="horizontal" />
        <Text as="span" weight="bold" textWrap="nowrap">
          {text}
        </Text>
      </HStack>
    </>
  );
}
