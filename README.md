# Montenegro Route Planner

A modern, scalable route planner for tourists in Montenegro, built with Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, REST API, and Google Maps API. This is a portfolio-grade project that enables users to configure a custom day trip, see a feasible route, get a price, and submit a booking request.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn/UI
- **Database**: Prisma + PostgreSQL
- **APIs**: Google Maps API
- **Testing**: Vitest + React Testing Library

## 📁 Project Structure

```
src/
├── app/              # Next.js routing and layouts (App layer)
├── components/       # Shared UI components (Shared layer)
├── features/         # Feature-based modules (Features layer)
├── lib/              # Business logic and utilities (Shared layer)
├── data/             # Static data (Shared layer)
└── types/            # TypeScript type definitions (Shared layer)
```

## ⚡ Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📋 Project Plan

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for the detailed implementation roadmap.

---

# Project Standards & Rules

## Documentation Index
<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output CLAUDE.md|01-app:{04-glossary.mdx}|01-app/01-getting-started:{01-installation.mdx,02-project-structure.mdx,03-layouts-and-pages.mdx,04-linking-and-navigating.mdx,05-server-and-client-components.mdx,06-cache-components.mdx,07-fetching-data.mdx,08-updating-data.mdx,09-caching-and-revalidating.mdx,10-error-handling.mdx,11-css.mdx,12-images.mdx,13-fonts.mdx,14-metadata-and-og-images.mdx,15-route-handlers.mdx,16-proxy.mdx,17-deploying.mdx,18-upgrading.mdx}|01-app/02-guides:{analytics.mdx,authentication.mdx,backend-for-frontend.mdx,caching.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,data-security.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,json-ld.mdx,lazy-loading.mdx,local-development.mdx,mcp.mdx,mdx.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,prefetching.mdx,production-checklist.mdx,progressive-web-apps.mdx,public-static-pages.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,single-page-applications.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx,videos.mdx}|01-app/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|01-app/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|01-app/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx,version-16.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache-private.mdx,use-cache-remote.mdx,use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,proxy.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,refresh.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,updateTag.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheHandlers.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,isolatedDevBuild.mdx,logging.mdx,mdxRs.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackFileSystemCache.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-10.mdx,version-11.mdx,version-12.mdx,version-13.mdx,version-14.mdx,version-9.mdx}|02-pages/03-building-your-application/01-routing:{01-pages-and-layouts.mdx,02-dynamic-routes.mdx,03-linking-and-navigating.mdx,05-custom-app.mdx,06-custom-document.mdx,07-api-routes.mdx,08-custom-error.mdx}|02-pages/03-building-your-application/02-rendering:{01-server-side-rendering.mdx,02-static-site-generation.mdx,04-automatic-static-optimization.mdx,05-client-side-rendering.mdx}|02-pages/03-building-your-application/03-data-fetching:{01-get-static-props.mdx,02-get-static-paths.mdx,03-forms-and-mutations.mdx,03-get-server-side-props.mdx,05-client-side.mdx}|02-pages/03-building-your-application/06-configuring:{12-error-handling.mdx}|02-pages/04-api-reference:{06-edge.mdx,08-turbopack.mdx}|02-pages/04-api-reference/01-components:{font.mdx,form.mdx,head.mdx,image-legacy.mdx,image.mdx,link.mdx,script.mdx}|02-pages/04-api-reference/02-file-conventions:{instrumentation.mdx,proxy.mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-api-reference/03-functions:{get-initial-props.mdx,get-server-side-props.mdx,get-static-paths.mdx,get-static-props.mdx,next-request.mdx,next-response.mdx,use-params.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,userAgent.mdx}|02-pages/04-api-reference/04-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,assetPrefix.mdx,basePath.mdx,bundlePagesRouterDependencies.mdx,compress.mdx,crossOrigin.mdx,devIndicators.mdx,distDir.mdx,env.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,httpAgentOptions.mdx,images.mdx,isolatedDevBuild.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,serverExternalPackages.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,webVitalsAttribution.mdx,webpack.mdx}|02-pages/04-api-reference/04-config:{01-typescript.mdx,02-eslint.mdx}|02-pages/04-api-reference/05-cli:{create-next-app.mdx,next.mdx}|03-architecture:{accessibility.mdx,fast-refresh.mdx,nextjs-compiler.mdx,supported-browsers.mdx}|04-community:{01-contribution-guide.mdx,02-rspack.mdx}<!-- NEXT-AGENTS-MD-END -->

## Standards & Automation Protocol
For project automation and specific domain standards, you MUST use the find-skills tool to locate and invoke the most relevant skills from skills.sh. Focus on these 5 core areas, but if you think you need another skill then search it:

- **Framework (Next.js)**: Locate skills for nextjs-best-practices. Use them for architectural decisions, migrations, and ensuring Next.js 16 standards.
- **Typing (TypeScript)**: Locate skills for typescript-standards. Enforce strict typing, avoid any, and prefer type over interface.
- **Styles (Tailwind & Shadcn/UI)**: Locate skills for tailwind-best-practices and shadcn-ui. Use them to install components and ensure consistent utility class usage.
- **Testing (Vitest)**: Locate skills for vitest-unit-testing and testing-library-react. Use them to generate, run, and fix unit tests.
- **UI Development (Storybook)**: Locate skills for storybook. Use them to scaffold stories for every new UI component.

## Guy's Custom Code Style (Non-Negotiable)

### Style
- **RTL & Logical Properties**: NEVER use 'left'/'right'. ALWAYS use CSS Logical Properties: 'start', 'end', 'inline', 'block'.

### Testing Philosophy

#### Spec-Driven Development (SDD)
Define the Spec: Before writing any feature logic, you MUST create a comprehensive test suite (including the Happy Path and at least two Edge Cases).

Prevent Confirmatory Bias: Do not write code first and then tests. Writing tests first ensures the code is built to satisfy requirements, not the other way around.

The Workflow:

1. Create the test file with the Factory and all test cases.
2. Implement the minimal feature logic required to pass all tests (Green State).
3. Refactor the implementation for clarity and performance while maintaining the Green state.

#### Assert What Matters
- Avoid brittle tests: Don't use `toBe()` for long strings or complex objects if only a part is relevant.
- Use `toContain()` or `toMatch()` to focus on the requirement.
- ✅ *Example*: `expect(result).toMatch(/Guy/);` instead of `expect(result).toBe("Welcome Guy");`

#### The Happy Path & Factories
- **First Test**: Always test the "Happy Path" first with a valid object.
- **Factory Pattern**: Use factory functions (e.g., `makeUser(overrides = {})`) to generate test data.
- **Isolation**: Each subsequent test should break exactly ONE parameter from the happy path.
- **Naming**: The test name must reflect the specific parameter being tested/broken.
- ✅ *Example*:
```ts
function makeUser(overrides = {}) {
  return {
    name: "John Doe",
    email: "john@example.com",
    isActive: true,
    ...overrides
  };
}

// Happy Path
test("should create user with valid data", () => {
  const user = makeUser();
  expect(createUser(user)).toBeTruthy();
});

// Failure Mode
test("should fail if name is missing", () => {
  const user = makeUser({ name: null });
  expect(() => createUser(user)).toThrow("Name is required");
});
```

### Git Workflow & Commits
- **Conventional Commits**: All commit messages must follow the Conventional Commits specification.
- **Format**: `<type>(<scope>): <description>`
- **Types**:
  - `feat`: A new feature.
  - `fix`: A bug fix.
  - `docs`: Documentation only changes.
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
  - `refactor`: A code change that neither fixes a bug nor adds a feature.
  - `test`: Adding missing tests or correcting existing tests.
  - `chore`: Changes to the build process or auxiliary tools and libraries.
- **Example**: `feat(logic): implement happy-path return for todo validation`

### Folder Structure (Feature-Based)

#### Folder Structure (Fractal & Layered Hierarchy)
The Shared Layer (src root): Example for global folders (/api, /database, /components, /utils, /assets, /hooks, /services). They are Domain-Agnostic and can be used by any Feature or the App layer.

The Features Layer (src/features): A special folder where each sub-folder is a self-contained module (e.g., features/todo-list). Every feature should replicate the root structure internally for its own domain-specific logic (features/todo-list/components, features/todo-list/utils, etc.).

The App Layer (src/app): Next.js routing and layouts. This layer acts as the "Glue", importing from Features and Shared layers to compose pages.

#### Dependency Rules (Non-Negotiable):
- **Shared is the base**: It CANNOT import from Features or App.
- **Features are isolated**: A feature CAN import from Shared, but CANNOT import from the App layer. It should avoid importing from other Features (use Shared if logic is common).
- **App is the consumer**: It CAN import from both Features and Shared.
- **Direction of Flow**: Shared → Features → App. Never the reverse.

## Learning Protocol
1. Before implementing any feature, explain which Next.js pattern you are using and why.
2. If a Skill provides a specific Best Practice, quote the reasoning briefly so I can learn it.
3. When using find-skills, prioritize vercel-labs, if not found you may use the communities skills.

## Do Not
- Store secrets in code (use environment variables)
- Commit without running typecheck and tests
