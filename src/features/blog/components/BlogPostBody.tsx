interface BlogPostBodyProps {
  body: string;
}

export default function BlogPostBody({ body }: BlogPostBodyProps) {
  return (
    <article
      className="
        max-w-none text-gray-700
        [&_h2]:text-gray-900 [&_h2]:text-3xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:leading-tight
        [&_h3]:text-gray-900 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:leading-snug
        [&_h4]:text-gray-800 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-8 [&_h4]:mb-3
        [&_p]:mb-6 [&_p]:text-[1.0625rem] [&_p]:leading-[1.8] [&_p]:text-gray-700
        [&_a]:text-[#0071e3] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[#0071e3]/70 [&_a]:transition-colors
        [&_strong]:text-gray-900 [&_strong]:font-semibold
        [&_em]:italic [&_em]:text-gray-600
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
        [&_li]:text-[1.0625rem] [&_li]:leading-[1.8] [&_li]:text-gray-700
        [&_blockquote]:border-l-4 [&_blockquote]:border-[#FFCC00] [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:text-lg [&_blockquote]:bg-[#FFCC00]/5 [&_blockquote]:py-4 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-lg
        [&_img]:rounded-xl [&_img]:my-10 [&_img]:w-full [&_img]:object-cover [&_img]:shadow-sm
        [&_pre]:bg-gray-50 [&_pre]:border [&_pre]:border-gray-200 [&_pre]:rounded-xl [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:my-8 [&_pre]:text-sm
        [&_code]:font-mono [&_code]:text-sm [&_code]:text-[#0071e3] [&_code]:bg-[#0071e3]/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
        [&_pre_code]:bg-transparent [&_pre_code]:text-gray-700 [&_pre_code]:px-0 [&_pre_code]:py-0
        [&_hr]:border-gray-200 [&_hr]:my-12
        [&_table]:w-full [&_table]:my-8 [&_table]:text-sm [&_table]:border-collapse
        [&_th]:text-left [&_th]:text-gray-900 [&_th]:font-semibold [&_th]:pb-3 [&_th]:border-b-2 [&_th]:border-gray-200 [&_th]:py-3 [&_th]:px-4
        [&_td]:py-3 [&_td]:px-4 [&_td]:border-b [&_td]:border-gray-100 [&_td]:text-gray-600
        [&_tr:hover_td]:bg-gray-50
      "
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
