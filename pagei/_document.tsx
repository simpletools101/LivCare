export default function DOM() {
    return (
        // pages/_document.tsx (for pages router) or a custom `middleware.ts` (for app router)
        <script
            dangerouslySetInnerHTML={{
                __html: `
    (function() {


    if (!localStorage.getItem('theme')) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
    }


      
        console.log("Fuck shot")
    })();
  `,
            }}
        />
    )
}
