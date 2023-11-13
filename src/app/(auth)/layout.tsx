import type { PropsWithChildren } from "react";

export default function layout(props: PropsWithChildren) {
  return (
    <main className="flex flex-col md:h-screen md:flex-row-reverse">
      <section className="mx-auto flex w-full items-start px-4 md:w-1/3 md:items-center md:px-0">
        <div className="relative mx-auto my-auto flex w-full min-w-min max-w-sm origin-left transform flex-row items-center py-4 pt-4 text-primary md:-left-2.5 md:mx-0 md:py-4">
          Paxsi
        </div>
      </section>
      <section className="justify-center px-4 md:flex md:w-2/3 md:border-r md:px-0">
        {props.children}
      </section>
    </main>
  );
}

