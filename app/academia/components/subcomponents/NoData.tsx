'use client'
import Link from "next/link";
import React from "react";
import { FaQuestion } from "react-icons/fa6";

export default function NoData({ component }: { component: string }) {
  return (
    <>
    <div className="flex h-full max-h-[80vh] min-h-[25vh] min-w-full animate-fadeIn flex-col items-center justify-center gap-2 rounded-2xl bg-light-button p-12 text-light-accent dark:bg-dark-button dark:text-dark-accent">
      <FaQuestion
        title="loading"
        className={`text-2xl font-medium text-light-accent dark:text-dark-accent`}
      />
      <h4 className="text-lg font-medium text-light-accent dark:text-dark-accent text-center">We couldn&apos;t find {component} from SRM Academia</h4>
      <p className="text-center text-sm text-light-accent dark:text-dark-accent opacity-50">Might be because of data refresh. If you can see in SRM Academia, report in <Link className="underline font-medium" href="/whatsapp">Whatsapp</Link></p>
    </div>
    </>
  );
}
