"use client";

import { MDXRemote } from "next-mdx-remote";
import React from "react";
import type { Source } from "@/types/post";
import type { MDXComponents } from "mdx/types";

interface MDXRendererProps {
  source: Source;
  components?: MDXComponents;
}

export default function MDXRenderer({ source, components }: MDXRendererProps) {
  return <MDXRemote {...source} components={components} />;
}
