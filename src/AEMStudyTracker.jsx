import { useState, useEffect } from "react";

const EXAM_INFO = {
  name: "AD0-E121 AEM Sites Business Practitioner Expert",
  questions: 50,
  passing: 32,
  duration: "100 min",
  cost: "$225",
  date: "Target: ~2 months"
};

const DOMAINS = [
  {
    id: "business",
    label: "Business Analysis",
    weight: 38,
    color: "#C94F2C",
    lightColor: "#FDF1ED",
    borderColor: "#F0A48A",
    icon: "📊",
    description: "Heaviest section. Scenario-based questions mapping AEM modules to business problems, stakeholder management, and budget/scope decisions.",
    topics: [
      "Map AEM modules (Sites, Assets, Forms, DAM) to business problems",
      "Content management concepts across AEM modules",
      "Identify typical project stakeholders",
      "Support collaboration across all project parties",
      "Meet core business goals within budget and scope",
      "Answer developer questions relative to business goals",
      "MSM vs. Launches vs. Workflows — when to recommend each",
      "Content Fragment vs. Experience Fragment decision-making",
      "Headless CMS patterns and SPA architecture",
    ],
    exercises: [
      {
        id: "b1",
        title: "Content Fragment vs. Experience Fragment Decision",
        duration: "45 min",
        difficulty: "Medium",
        path: "Assets → Files",
        steps: [
          "PREREQUISITE — Create a Content Fragment Model: Go to Tools → General → Content Fragment Models. Select your project's configuration folder. Click Create → name it 'Article Model'.",
          "In the Article Model editor, drag in these field types from the right panel: Single-line text (label it 'Title'), Multi-line text (label it 'Body'), Single-line text (label it 'Author'). Click Save. Then toggle the model to Enabled.",
          "Create a Content Fragment: Go to Assets → Files → navigate to a folder → Create → Content Fragment → select 'Article Model'. Name it 'My First CF'. Fill in title, body, and author. Save & Close.",
          "Create an Experience Fragment: Go to Sites → Experience Fragments → Create → Experience Fragment. Choose the 'Web' variation template. Name it 'Promo Banner'. Open it and add an Image and a Text component. Author some content.",
          "IMPORTANT: Before an XF can be displayed on a page, it must be published. Select 'Promo Banner' in the Experience Fragments console → Manage Publication → Publish Now. Wait for confirmation.",
          "Add the CF to a page: Open a test page in Edit mode → drag in a Content Fragment component → click the wrench to configure → browse to your 'My First CF' → save. Preview the page to confirm it renders.",
          "Add the XF to a different page: Open another test page → drag in an Experience Fragment component → configure → set Fragment Path to your 'Promo Banner' XF. Leave Variation Name blank to use the Master variation. Save and preview.",
          "If XF variations are not displaying: (1) confirm the XF is published, (2) verify the Fragment Path is exactly correct — copy it from the Experience Fragments console, (3) confirm the XF component is in the template's allowed components policy.",
          "Connect the CF to the API endpoint: AEM exposes CFs via the Assets HTTP API. The URL pattern is: http://localhost:4502/api/assets/[dam-path-to-your-cf].json — for example, if your CF is at /content/dam/demo-site/my-first-cf, open: http://localhost:4502/api/assets/demo-site/my-first-cf.json",
          "You'll see the CF returned as JSON — this is exactly how a mobile app or headless front-end consumes it. Note the 'properties' object containing your title, body, and author fields.",
          "Decision check: Client needs structured product data for web AND mobile app → CF or XF? (CF — channel-agnostic, API-consumable). Client needs a reusable designed promo banner across pages → CF or XF? (XF — carries layout and visual design)."
        ],
        keyInsight: "Content Fragments require a Model first (Tools → General → Content Fragment Models). Experience Fragments must be published before the XF component can render them — this is the most common mistake. CF API endpoint: /api/assets/[dam-path].json. CF = headless structured data. XF = reusable designed layout."
      },
      {
        id: "b2",
        title: "Multi-Site Manager (MSM) Live Copy",
        duration: "60 min",
        difficulty: "Hard",
        path: "Sites → Create → Live Copy",
        steps: [
          "Select a source page → Create → Live Copy → choose destination",
          "Configure rollout config: set to 'Rollout on activation'",
          "Edit the source page, then Rollout the change",
          "Observe the Live Copy page updated automatically",
          "Detach inheritance on ONE component on the Live Copy page",
          "Edit the source again and rollout — verify detached component did NOT update",
          "Review the Blueprint console to see all Live Copies"
        ],
        keyInsight: "MSM is for multi-region/multi-brand content from one source. Know: Blueprint → Live Copy → Rollout → Inheritance Cancellation. Exam loves this."
      },
      {
        id: "b3",
        title: "Launches for Scheduled Campaign Content",
        duration: "30 min",
        difficulty: "Easy",
        path: "Sites → Create → Launch",
        steps: [
          "Select a page → Create → Launch → set a future promotion date",
          "Make edits inside the Launch (live site unaffected)",
          "Open Sites → Launches console — observe the launch listed",
          "Preview the launch to see future state",
          "Promote the launch manually and watch the page update",
          "Compare: when would you use a Launch vs. a Workflow?"
        ],
        keyInsight: "Launches = future-dated content campaigns. Workflows = approval processes. MSM = persistent multi-site relationships. Know when to recommend each."
      },
      {
        id: "b4",
        title: "Workflow Model: 2-Step Approval",
        duration: "60 min",
        difficulty: "Hard",
        path: "Tools → Workflow → Models",
        steps: [
          "Create a new workflow model named '2-Step Content Approval'",
          "Add Step 1: Participant Step → assign to content-authors group",
          "Add Step 2: Participant Step → assign to administrators group",
          "Add Step 3: Process Step → use 'Activate Page' process",
          "Add End step. Click Sync (required before use)",
          "Apply the workflow to a test page via Manage Publication",
          "Open Workflow Inbox as User 1 and approve Step 1",
          "Log in as User 2 and approve Step 2 — verify page activates"
        ],
        keyInsight: "Workflow models, participant steps, process steps, the Sync requirement, and the Inbox location are all exam staples."
      },
      {
        id: "b5",
        title: "Scenario Simulation: Government Microsite",
        duration: "90 min",
        difficulty: "Hard",
        path: "End-to-end across all tools",
        steps: [
          "Create an Editable Template with restricted policy (only Text, Image, Button components)",
          "Set up a Live Copy from an existing site for the microsite",
          "Configure a 2-step workflow on the new site's pages",
          "Create a custom metadata schema with a 'Security Classification' field",
          "Apply the schema to the campaign's DAM folder",
          "Create a user group 'microsite-authors' with access only to the new site path",
          "Test the full flow: author creates page → workflow fires → approver publishes"
        ],
        keyInsight: "This single exercise covers all four exam domains. Mirrors the scenario-based format of actual exam questions."
      }
    ]
  },
  {
    id: "architecture",
    label: "Architecture",
    weight: 24,
    color: "#1B6CA8",
    lightColor: "#EDF4FB",
    borderColor: "#90BEE0",
    icon: "🏗️",
    description: "Information Architecture, AEM integrations with third-party services, roles & permissions, and caching strategies.",
    topics: [
      "Information Architecture using AEM Standard Features (on-prem or cloud)",
      "AEM integrations: Adobe Target, Analytics, Launch, Campaign",
      "Roles and permissions — users, groups, ACLs",
      "Caching approaches: Dispatcher, CDN, TTL",
      "ContextHub and personalization architecture",
      "AEM as a Cloud Service vs. AMS vs. on-prem differences",
      "Content architecture: pages, templates, /conf vs. /apps vs. /content",
      "Replication architecture: author → publish → Dispatcher"
    ],
    exercises: [
      {
        id: "a1",
        title: "Editable Template + Policy Creation",
        duration: "45 min",
        difficulty: "Medium",
        path: "Tools → General → Templates",
        steps: [
          "Go to Tools → General → Templates. You will see a list of configuration folders.",
          "Click Create → Configuration Folder. Name it after your project (e.g. 'demo-site'). This creates /conf/demo-site in the JCR — this is where all your template configs live.",
          "Open your new folder → click Create → Page Template → choose 'Empty Page' as the template type → name it 'Basic Page'.",
          "The template opens in Structure mode. Structure mode defines the locked scaffold — components you add here appear on every page and cannot be moved or deleted by page authors.",
          "Click the Layout Container (blue outline). On the left-side toolbar that appears, click the component policy icon — it looks like a hamburger menu with a gear symbol (≡⚙), not a wrench.",
          "In the policy dialog, click the + icon to create a new policy. Name it 'Restricted Policy'. Under Allowed Components, expand your project group and check only: Text, Image, and Button. Save.",
          "Click the page-mode icon in the top-left and switch to 'Initial Content' mode. Add a Title component and type placeholder text. This is the default content authors see when they create a new page from this template.",
          "Switch back to Structure mode. At the top, click Enable to activate the template for use.",
          "Go to Sites → navigate to your site → Create → Page → you should see 'Basic Page' available. Create a test page.",
          "Open the test page in Edit mode and open the component browser (+ icon). Verify that only Text, Image, and Button appear — all other components should be absent.",
          "Now go back to the template policy and add one more component (e.g. Teaser). Return to the page and confirm it appears — this demonstrates how a policy change instantly affects all pages using that template."
        ],
        keyInsight: "Templates live under /conf/[project]/settings/wcm/templates — not /apps or /content. Structure mode = locked scaffold. Policies are shared references: one policy update affects every template and page that uses it. The policy icon in Structure mode is a hamburger with a gear (≡⚙)."
      },
      {
        id: "a2",
        title: "Roles, Groups & Permissions Deep Dive",
        duration: "60 min",
        difficulty: "Medium",
        path: "Tools → Security → Groups / Users",
        steps: [
          "Go to Tools → Security → Groups → click Create. Name the group 'content-editors-demo'. Save.",
          "Go to Tools → Security → Users → click Create. Set username: 'testauthor', password: 'Test1234!' (remember this). Save.",
          "Open the testauthor user → click the Groups tab → search for 'content-editors-demo' → add it. Save.",
          "Go to Tools → Security → Permissions (or navigate directly to /useradmin). In the search field, find your group 'content-editors-demo'.",
          "Click the path /content/[your-site] → add an Allow ACE for content-editors-demo with privileges: jcr:read, jcr:modifyProperties, rep:write. This allows reading and editing pages.",
          "Add a Deny ACE for content-editors-demo on the path /content/dam. Deny overrides any inherited allow — the user will be blocked from Assets regardless of parent path permissions.",
          "To test the permissions: open a Private/Incognito browser window → go to http://localhost:4502 → log in as testauthor / Test1234!",
          "Note: AEM's built-in impersonation feature (the 'Impersonate' button in user management) may throw an error on local SDK instances — this is expected. Always use incognito login for reliable permission testing locally.",
          "While logged in as testauthor: navigate to Sites and try editing a page at your site path. It should succeed.",
          "Try navigating to Assets (/assets.html or the Assets rail). It should be inaccessible or show no content — the deny on /content/dam is working.",
          "Back as admin: browse Tools → Security → Groups and explore: content-authors (default page authors), dam-users (DAM access), workflow-users (can initiate workflows), administrators (full access). Note what each group grants by default."
        ],
        keyInsight: "Deny always overrides allow in AEM's ACL model. The three key privileges: jcr:read (see content), jcr:modifyProperties (edit properties), rep:write (create/delete nodes). AEM's UI impersonation may not work on local SDK — use incognito windows for testing. The exam gives you a business scenario and asks which group or privilege applies."
      },
      {
        id: "a3",
        title: "Dispatcher Flush Agents & Caching",
        duration: "45 min",
        difficulty: "Medium",
        path: "Tools → Deployment → Replication",
        steps: [
          "Open Agents on Author → find the Dispatcher Flush agent",
          "Click Edit → review URI, transport settings, and trigger conditions",
          "Click Test Connection to verify flush agent status",
          "Publish a page and watch the Replication Queue",
          "In browser dev tools, load a published page and inspect response headers",
          "Look for Cache-Control, Dispatcher, X-Vhost headers",
          "Publish a change and compare: cached vs. fresh response"
        ],
        keyInsight: "Flush agents invalidate (mark stale) cached files — they don't delete them. Understand the difference between cache invalidation and deletion. Know TTL and statfilelevel conceptually."
      },
      {
        id: "a4",
        title: "Cloud Services & Third-Party Integrations",
        duration: "45 min",
        difficulty: "Medium",
        path: "Tools → Cloud Services",
        steps: [
          "Browse Tools → Cloud Services — note available OOTB integrations",
          "Open an existing integration config (Analytics, Launch, or Target)",
          "Trace how it attaches to a site: Page Properties → Cloud Services tab",
          "Note the configuration path: /conf/[site]/settings/cloudconfigs",
          "Create a dummy Cloud Service config on a test page",
          "Verify it appears in Page Properties → Cloud Services"
        ],
        keyInsight: "Cloud Service configs live under /conf (modern) or /etc/cloudservices (legacy). They're attached at the page level via Page Properties and inherited by child pages."
      },
      {
        id: "a5",
        title: "ContextHub & Personalization",
        duration: "45 min",
        difficulty: "Hard",
        path: "Tools → Sites → ContextHub",
        steps: [
          "Explore default ContextHub stores in Tools → Sites → ContextHub",
          "On an author page, open the ContextHub toolbar (person icon in top bar)",
          "Simulate a different user persona and observe Targeted content changes",
          "Navigate to Tools → Sites → Segments — review segment definitions",
          "Create a simple segment based on a ContextHub store value",
          "Set up a Targeted component on a page (requires Target or Campaign activity)"
        ],
        keyInsight: "ContextHub = client-side data layer. Segments use ContextHub store data. Targeting = segments + experiences + activities. Know where each is configured."
      }
    ]
  },
  {
    id: "education",
    label: "Education",
    weight: 22,
    color: "#2E7D32",
    lightColor: "#EDF7EE",
    borderColor: "#88C98A",
    icon: "📚",
    description: "AEM features and capabilities, how to train content editors, and recommending the right AEM feature for each business need.",
    topics: [
      "Core Components — what they are, how to configure them",
      "Page editor features: modes, toolbars, sidekick",
      "Page Properties — all tabs and what they control",
      "DAM and metadata schemas",
      "Tags and Tag Manager",
      "Search and query tools (Omnisearch, Query Builder)",
      "AEM Sites, Assets, Forms — feature matrix",
      "Training content editors: what they need to know",
      "AEM as a Cloud Service key differences for business practitioners"
    ],
    exercises: [
      {
        id: "e1",
        title: "Page Editor Feature Tour",
        duration: "45 min",
        difficulty: "Easy",
        path: "Sites → open any page → Edit",
        steps: [
          "Open Page Properties → review ALL tabs: Basic, Advanced, Cloud Services, Permissions, Thumbnail, Social Media",
          "Note: Advanced tab has Vanity URL, Authentication Requirement, and Design",
          "Select a component → review toolbar: Edit, Configure, Copy, Move, Delete, Lock inheritance",
          "Open sidekick/Component browser → switch between Components, Assets, Content Tree tabs",
          "Switch to Preview mode vs. Edit mode",
          "Use Timewarp (clock icon) to simulate the page at a past date",
          "Open the Annotate mode and add a comment to a component"
        ],
        keyInsight: "The exam expects you to know what every Page Properties tab does. Advanced tab = vanity URLs and auth requirements. Permissions tab = CUG (Closed User Groups)."
      },
      {
        id: "e2",
        title: "DAM Metadata Schema Creation",
        duration: "45 min",
        difficulty: "Medium",
        path: "Tools → Assets → Metadata Schemas",
        steps: [
          "Open the default schema — note all included fields and their types",
          "Create a copy of the default schema named 'gov-assets'",
          "Add a custom field: 'Security Classification' (dropdown: Unclassified, CUI, Confidential)",
          "Add a second field: 'Document Owner' (text input)",
          "Save and apply to a DAM folder via folder Properties → Metadata Schema",
          "Upload an asset to that folder",
          "Open the asset properties — verify your custom fields appear"
        ],
        keyInsight: "Schemas define what metadata fields appear on assets. Applied per folder. The exam tests this in both Education and Business Analysis contexts."
      },
      {
        id: "e3",
        title: "Tags, Tag Manager & Content Organization",
        duration: "30 min",
        difficulty: "Easy",
        path: "Tools → General → Tagging",
        steps: [
          "Create a tag namespace 'exam-prep' with 4 child tags",
          "Apply tags to a page via Page Properties → Basic → Tags",
          "Apply the same tags to a DAM asset",
          "Use Omnisearch in the top bar to search by tag",
          "In Assets, use the Filter panel to filter by your tags",
          "Note the tag storage path: /content/cq:tags"
        ],
        keyInsight: "Tags are stored under /content/cq:tags and work across Sites and Assets. The exam asks when to recommend tagging as a content organization strategy vs. folder structure."
      },
      {
        id: "e4",
        title: "Core Components Policy Configuration",
        duration: "45 min",
        difficulty: "Medium",
        path: "Template Editor → Component Policy",
        steps: [
          "In the Template editor, add a Teaser core component to the layout",
          "Open the Policy for Teaser (wrench icon)",
          "Disable the 'Description' and 'Actions/Links' tabs in the policy",
          "Return to a page using this template — verify those tabs are gone",
          "Create a second policy for Teaser that allows all tabs",
          "Apply it to a different template — confirm full Teaser dialog appears"
        ],
        keyInsight: "Component policies control which configuration tabs/options are visible to authors. This is how AEM enforces content governance without code changes."
      },
      {
        id: "e5",
        title: "AEM Feature Recommendation Matrix",
        duration: "30 min",
        difficulty: "Easy",
        path: "Concept exercise — no UI required",
        steps: [
          "Scenario 1 — A digital agency needs to reuse a designed hero banner (image + headline + CTA button) across 20 pages. When the banner is updated, all 20 pages should reflect the change automatically.",
          "Answer: Experience Fragment (XF). WHY: XFs are designed layout sections stored once and referenced many times. Edit the XF, and every page that includes it updates automatically. CFs carry no layout — they're data only.",
          "Scenario 2 — A retailer needs product descriptions to appear on the website AND feed a mobile app via REST API. The same content must power both channels.",
          "Answer: Content Fragment (CF). WHY: CFs are channel-agnostic structured data. The web page uses the CF component; the mobile app calls /api/assets/[path].json. XFs are tied to web layout and cannot be consumed by an API.",
          "Scenario 3 — A government agency runs 5 country sites. 80% of content is shared policy/program content; 20% is country-specific. The central team needs to push updates to all sites at once.",
          "Answer: MSM / Live Copy. WHY: MSM creates a Blueprint (master site) and Live Copies (country sites). Rollout pushes Blueprint changes to all Live Copies automatically. Country editors can cancel inheritance on the 20% they need to localize.",
          "Scenario 4 — A marketing team is building a campaign microsite that goes live in exactly 2 weeks. Content must be authored now without affecting the current live site.",
          "Answer: Launch. WHY: A Launch is a staging overlay on existing pages. Authors work inside the Launch; the live site is completely untouched. On go-live date, the Launch is promoted and the new content goes live.",
          "Scenario 5 — A legal team requires that all press release pages be reviewed by an editor, then a manager, then a legal reviewer before publishing. No page can go live without all three approvals.",
          "Answer: Workflow. WHY: Workflow models define sequential participant steps (human approvals) and process steps (e.g., Activate Page). Each approver sees the item in their Workflow Inbox and must complete their step before it advances.",
          "Bonus — A company wants to A/B test two versions of a landing page for 30 days, showing version A to 50% of visitors and version B to the other 50%.",
          "Answer: Launch (for the alternate content version) + ContextHub or Adobe Target integration (for the traffic split and targeting logic). Launches create the variant; personalization tools control which visitors see which version."
        ],
        keyInsight: "Five mappings to memorize: XF = designed reusable layout section. CF = structured headless data (API-consumable). MSM = persistent multi-site inheritance with rollout. Launch = future-dated campaign staging. Workflow = sequential human approval process. The exam gives a business scenario — you pick the feature."
      }
    ]
  },
  {
    id: "setup",
    label: "Setup & Implementation",
    weight: 16,
    color: "#6A1B9A",
    lightColor: "#F5EEF8",
    borderColor: "#C39BD3",
    icon: "⚙️",
    description: "Configure content components correctly, verify feature implementation, and locate/describe errors.",
    topics: [
      "Content component configuration best practices",
      "Editable Templates: Structure / Initial Content / Layout modes",
      "AEM Web Console (Felix): bundles, configurations, logs",
      "Error identification: error.log, CRXDE Lite, Operations dashboard",
      "Replication: Quick Publish vs. Manage Publication vs. Activate",
      "Package Manager: install, build, replicate packages",
      "CRXDE Lite: reading the JCR, node types, properties",
      "Sling URL decomposition and resource resolution",
      "AEM as a Cloud Service: Cloud Manager, pipeline basics"
    ],
    exercises: [
      {
        id: "s1",
        title: "Web Console (Felix) & Bundle Health Check",
        duration: "30 min",
        difficulty: "Medium",
        path: "Tools → Operations → Web Console (/system/console)",
        steps: [
          "Navigate to /system/console/bundles",
          "Look for any bundles NOT in 'Active' state (Installed/Resolved = problem)",
          "Click a healthy bundle to read its details: version, dependencies",
          "Go to /system/console/configMgr — browse available OSGi configurations",
          "Open 'Day CQ WCM Page Manager Factory' — note configurable settings",
          "Go to /system/console/logs — review the log tail for ERROR/WARN entries"
        ],
        keyInsight: "Bundles in 'Installed' or 'Resolved' state (not 'Active') indicate unresolved dependencies or errors. This is a go-to diagnostic location the exam expects you to know."
      },
      {
        id: "s2",
        title: "Error Log Investigation",
        duration: "30 min",
        difficulty: "Medium",
        path: "Tools → Operations → Log Support",
        steps: [
          "Go to Tools → Operations → Diagnosis → Log Messages",
          "Download or view error.log",
          "Search for ERROR and WARN entries — read 5 of them",
          "Note the pattern: [timestamp] [level] [class] [message]",
          "Identify: which errors are likely configuration issues vs. content issues",
          "Go to Tools → Operations → Replication Status — check for failed replication",
          "Go to Tools → Operations → Overview — review system health indicators"
        ],
        keyInsight: "The Operations dashboard is your first stop for system health. Know the difference between configuration errors (OSGi, bundles) and content errors (missing references, replication failures)."
      },
      {
        id: "s3",
        title: "CRXDE Lite: JCR Navigation",
        duration: "45 min",
        difficulty: "Medium",
        path: "Tools → CRXDE Lite (/crx/de)",
        steps: [
          "Open a page you created — find its node at /content/[site]/[page]/jcr:content",
          "Read the properties: sling:resourceType, jcr:title, cq:template",
          "Navigate to /conf/[project]/settings/wcm/templates — find your template",
          "Navigate to /content/cq:tags — browse the tag structure",
          "Find a component's policy reference: /conf/.../policies/jcr:content",
          "Locate the actual component definition under /apps or /libs",
          "Add a custom property to a test page node — verify it appears in Page Properties"
        ],
        keyInsight: "CRXDE shows you the raw JCR (Java Content Repository). Understand sling:resourceType (what renders the component), cq:template (which template created the page), and jcr:content (where page properties live)."
      },
      {
        id: "s4",
        title: "Replication: All Three Publication Methods",
        duration: "30 min",
        difficulty: "Easy",
        path: "Sites → select page",
        steps: [
          "Method 1: Right-click a page → Quick Publish — immediate, no workflow",
          "Method 2: Select a page → Manage Publication — choose schedule or workflow",
          "Method 3: Open page → Page Properties → Activate (legacy method)",
          "In Tools → Deployment → Replication → Agents on Author — open Default Agent",
          "Test Connection, then publish a page and watch the Replication Queue",
          "Unpublish a page and verify it's gone from publish",
          "Note: which method would you recommend for a midnight campaign launch?"
        ],
        keyInsight: "Quick Publish = immediate, no approval. Manage Publication = scheduled or workflow-gated. Know when each is appropriate — the exam gives scheduling scenarios."
      },
      {
        id: "s5",
        title: "Package Manager: Build, Install, Replicate",
        duration: "30 min",
        difficulty: "Medium",
        path: "Tools → Deployment → Packages (/crx/packmgr)",
        steps: [
          "Open Package Manager at /crx/packmgr",
          "Create a new package: add a filter for /content/[your-test-site]",
          "Build the package — observe the log output",
          "Download the .zip package",
          "Install the same package back (simulating a content migration)",
          "Replicate the package to publish",
          "Note the difference: Build (creates archive), Install (applies to JCR), Replicate (pushes to publish)"
        ],
        keyInsight: "Package Manager is how content and code move between AEM instances. Know Build vs. Install vs. Replicate. The exam may ask about content migration strategies."
      }
    ]
  }
];

const ADDITIONAL_TOPICS = [
  {
    id: "headless",
    label: "Headless & SPA Architecture",
    icon: "🔌",
    weight: "High priority",
    color: "#E65100",
    lightColor: "#FFF3E0",
    why: "Increasingly tested as AEM Cloud adoption grows. Expect 2–4 questions.",
    topics: [
      "Content Fragments API and GraphQL endpoint (/graphql/execute.json)",
      "AEM Content Services (Sling Model Exporter)",
      "SPA Editor — how React/Angular SPAs integrate with AEM author",
      "Headless delivery patterns vs. traditional page delivery",
      "Universal Editor basics (AEMaaCS)"
    ],
    exercises: [
      {
        id: "h1",
        title: "Content Fragment GraphQL Query",
        duration: "30 min",
        difficulty: "Medium",
        path: "AEM GraphiQL Explorer (/content/graphiql.html)",
        steps: [
          "Create a Content Fragment Model with 3+ fields (title, body, image)",
          "Create 3 Content Fragment instances using that model",
          "Open the GraphiQL explorer at /content/graphiql.html",
          "Write a query: { [modelName]List { items { title body } } }",
          "Execute and view the JSON response",
          "Add a filter to the query to return only fragments with a specific title"
        ],
        keyInsight: "AEM's GraphQL endpoint enables headless delivery. The exam may ask when to recommend headless vs. traditional delivery and how CF models relate to the API schema."
      },
      {
        id: "h2",
        title: "SPA Editor Understanding",
        duration: "20 min",
        difficulty: "Hard",
        path: "Concept + Sites review",
        steps: [
          "Review an SPA-enabled page in Sites (if available in your sandbox)",
          "Note: SPA pages use sling:resourceType pointing to a React/Angular app",
          "The AEM SPA Editor maps AEM components to front-end components via JSON",
          "Open the page's JSON: append .model.json to any AEM page URL",
          "Read the JSON structure: :type maps to sling:resourceType",
          "Understand: authors edit in AEM, the SPA renders in the browser"
        ],
        keyInsight: "SPAs consume AEM content via JSON (the Sling Model Exporter). The .model.json suffix on any AEM page URL reveals the content model. Know this pattern."
      }
    ]
  },
  {
    id: "aemcs",
    label: "AEM as a Cloud Service",
    icon: "☁️",
    weight: "High priority",
    color: "#0277BD",
    lightColor: "#E1F5FE",
    why: "The exam specifically mentions on-prem AND cloud. Cloud differences are a growing exam focus.",
    topics: [
      "Cloud Manager: pipelines, environments (Dev/Stage/Prod)",
      "No direct access to OSGi console in production",
      "Immutable repository (/apps is read-only at runtime)",
      "Content Transfer Tool (migration from on-prem)",
      "Asset Compute Service (replaces traditional workflow for renditions)",
      "Dynamic Media with AEM as a Cloud Service",
      "New developer console vs. legacy CRXDE"
    ],
    exercises: [
      {
        id: "c1",
        title: "Cloud Manager Pipeline Review",
        duration: "20 min",
        difficulty: "Easy",
        path: "experience.adobe.com → Cloud Manager",
        steps: [
          "Log into Cloud Manager at experience.adobe.com",
          "Review your program's environments: Dev, Stage, Production",
          "Open a pipeline — note the stages: Build → Unit Test → Code Quality → Deploy",
          "Review the Code Quality gate: what metrics does it check?",
          "Note: in AEMaaCS, code deploys only through pipelines — no manual package install in prod",
          "Review the Environments tab — note author, publish, and preview tiers"
        ],
        keyInsight: "In AEMaaCS, /apps is immutable — you cannot install code packages at runtime. All code changes go through Cloud Manager pipelines. The exam will test your understanding of this constraint."
      }
    ]
  },
  {
    id: "search",
    label: "Search & Query",
    icon: "🔍",
    weight: "Medium priority",
    color: "#00695C",
    lightColor: "#E0F2F1",
    why: "Often overlooked but appears in both architecture and business analysis questions.",
    topics: [
      "Omnisearch and how it indexes content",
      "Query Builder API (/bin/querybuilder.json)",
      "AEM Search & Indexing: Oak indexes",
      "Asset search: metadata, full-text, tag-based",
      "Search facets and filters in Assets UI",
      "Smart Tags (AI-powered auto-tagging)"
    ],
    exercises: [
      {
        id: "sr1",
        title: "Query Builder API Exploration",
        duration: "30 min",
        difficulty: "Medium",
        path: "/bin/querybuilder.json (browser URL)",
        steps: [
          "Open your browser and go to: /bin/querybuilder.json?type=cq:Page&path=/content&p.limit=5",
          "This returns 5 pages from /content as JSON",
          "Modify: add &property=jcr:content/sling:resourceType&property.value=your/component",
          "Run the Query Debugger at /libs/cq/search/content/querydebug.html",
          "Search for all assets uploaded in the last 7 days",
          "Search for all pages using a specific template"
        ],
        keyInsight: "The Query Builder is AEM's search API. Business practitioners use it conceptually to understand what's findable and how to set up search experiences. The exam tests awareness, not syntax."
      }
    ]
  },
  {
    id: "dam",
    label: "Digital Asset Management (DAM)",
    icon: "🖼️",
    weight: "Medium priority",
    color: "#AD1457",
    lightColor: "#FCE4EC",
    why: "DAM workflows, renditions, and metadata are consistently tested across domains.",
    topics: [
      "Asset ingestion workflows and processing profiles",
      "Renditions: web-optimized, thumbnail, original",
      "Dynamic Media: presets, image serving, video profiles",
      "Asset Reports: usage, download, expiration",
      "Asset Link (Creative Cloud integration)",
      "Collections and private collections",
      "Asset versioning and restore",
      "Folder permissions and contribution folders"
    ],
    exercises: [
      {
        id: "d1",
        title: "Processing Profiles & Renditions",
        duration: "45 min",
        difficulty: "Medium",
        path: "Tools → Assets → Processing Profiles",
        steps: [
          "Open Tools → Assets → Processing Profiles",
          "Create a new Image profile: add 3 renditions (thumbnail 150x150, web 800x600, hero 1920x1080)",
          "Apply the profile to a DAM folder via folder Properties",
          "Upload a new image to that folder",
          "Open the asset → Renditions tab → verify your custom renditions were created",
          "View the asset's workflow history to see what ran on ingestion"
        ],
        keyInsight: "Processing profiles define what renditions are auto-generated on asset upload. Know the difference between a rendition (derived image) and the original. Applied per folder like metadata schemas."
      },
      {
        id: "d2",
        title: "Asset Reports",
        duration: "20 min",
        difficulty: "Easy",
        path: "Assets → Reports",
        steps: [
          "Navigate to Assets → Reports (or Tools → Assets → Asset Reports)",
          "Create a 'Download' report for the last 30 days",
          "Create an 'Asset Usage' report",
          "Review what information each report surfaces",
          "Note: how would you use these reports to advise a customer on content ROI?"
        ],
        keyInsight: "Asset Reports help justify DAM investment to stakeholders. The exam may ask which report to recommend for a given business reporting need."
      }
    ]
  }
];

const CALENDAR_SLOTS = [
  { date: "Thu Jun 12", day: "Thursday", time: "8:00–9:30 AM", domain: "architecture", topic: "Templates & Policies", exerciseIds: ["a1"], color: "#1B6CA8" },
  { date: "Thu Jun 12", day: "Thursday", time: "9:30–11:00 AM", domain: "architecture", topic: "Roles & Permissions", exerciseIds: ["a2"], color: "#1B6CA8" },
  { date: "Thu Jun 12", day: "Thursday", time: "11:00–11:30 AM", domain: "architecture", topic: "Quick review & practice quiz", exerciseIds: [], quizLink: "/architecture-quiz.html", color: "#1B6CA8" },
  { date: "Mon Jun 15", day: "Monday", time: "11:30 AM–1:00 PM", domain: "business", topic: "AEM Module Mapping to Business Problems", exerciseIds: ["b1", "e5"], color: "#C94F2C" },
  { date: "Mon Jun 15", day: "Monday", time: "2:30–5:00 PM", domain: "business", topic: "Workflows & MSM (Focus Time)", exerciseIds: ["b2", "b4"], color: "#C94F2C" },
  { date: "Tue Jun 16", day: "Tuesday", time: "8:00–9:30 AM", domain: "education", topic: "AEM Features & Core Components", exerciseIds: ["e1", "e4"], color: "#2E7D32" },
  { date: "Tue Jun 16", day: "Tuesday", time: "9:30–11:00 AM", domain: "setup", topic: "Setup, Implementation & Error ID", exerciseIds: ["s1", "s2"], color: "#6A1B9A" },
  { date: "Tue Jun 16", day: "Tuesday", time: "11:00 AM–12:00 PM", domain: "practice", topic: "Timed practice quiz (35 questions)", exerciseIds: [], quizLink: "/aem-exam-prep.html?timed=true", color: "#455A64" },
  { date: "Wed Jun 17", day: "Wednesday", time: "9:00–10:30 AM", domain: "architecture", topic: "Third-Party Integrations & ContextHub", exerciseIds: ["a4", "a5"], color: "#1B6CA8" },
  { date: "Wed Jun 17", day: "Wednesday", time: "10:30 AM–12:00 PM", domain: "business", topic: "Scenario-Based Practice Questions", exerciseIds: ["b3", "b5"], color: "#C94F2C" },
  { date: "Wed Jun 17", day: "Wednesday", time: "1:00–3:00 PM", domain: "practice", topic: "Full timed mock exam (35 questions)", exerciseIds: [], quizLink: "/mock-exam.html", color: "#455A64" },
  { date: "Thu Jun 18", day: "Thursday", time: "9:00–10:30 AM", domain: "education", topic: "DAM, Metadata Schemas & Tags", exerciseIds: ["e2", "e3", "d1", "d2"], color: "#2E7D32" },
  { date: "Thu Jun 18", day: "Thursday", time: "10:30 AM–12:00 PM", domain: "setup", topic: "CRXDE, Packages & Replication", exerciseIds: ["s3", "s4", "s5"], color: "#6A1B9A" },
  { date: "Thu Jun 18", day: "Thursday", time: "1:00–2:30 PM", domain: "additional", topic: "Headless, SPA & AEMaaCS Cloud", exerciseIds: ["h1", "h2", "c1"], color: "#E65100" },
  { date: "Fri Jun 19", day: "Friday", time: "9:00 AM–12:00 PM", domain: "practice", topic: "Final mock exam + gap review", exerciseIds: [], quizLink: "/final-exam.html", color: "#455A64" },
];

const DOMAIN_MAP = {
  business: DOMAINS[0],
  architecture: DOMAINS[1],
  education: DOMAINS[2],
  setup: DOMAINS[3],
  additional: { label: "Additional Topics", color: "#E65100" },
  practice: { label: "Practice Exam", color: "#455A64" }
};

const SETUP_PATHS = [
  {
    id: "cloud",
    title: "AEMaaCS via Cloud Manager",
    subtitle: "Recommended — no local install required",
    icon: "☁️",
    color: "#0277BD",
    lightColor: "#E1F5FE",
    borderColor: "#90CAF9",
    badge: "Recommended",
    intro: "Adobe provides free sandbox programs in Cloud Manager. This gives you a fully managed AEMaaCS environment (author + publish + preview tiers) with no local setup.",
    link: { label: "Open Cloud Manager ↗", url: "https://experience.adobe.com/#/@acsultimatesupport/cloud-manager/landing.html" },
    steps: [
      { id: "cm1", title: "Sign in to Experience Cloud", detail: "Go to experience.adobe.com and sign in with your Adobe ID." },
      { id: "cm2", title: "Open Cloud Manager", detail: "Navigate to Cloud Manager using the link above, or search for 'Cloud Manager' in the Experience Cloud app switcher." },
      { id: "cm3", title: "Create a Sandbox Program", detail: "Click 'Add Program' → select 'Set up a Sandbox'. Name it (e.g. 'AEM Exam Prep') and check AEM Sites under solutions. Click Save." },
      { id: "cm4", title: "Wait for provisioning", detail: "Cloud Manager provisions Dev, Stage, and Production environments. This takes 10–30 minutes. Status indicators appear on the program card." },
      { id: "cm5", title: "Access your Author environment", detail: "Once ready: open your program → Environments tab → click the Author URL. AEMaaCS uses your Adobe ID for login — no admin/admin credentials." },
      { id: "cm6", title: "Verify access", detail: "Navigate to Tools → General → Templates to confirm full author access. You're ready to start the exercises." },
    ]
  },
  {
    id: "local",
    title: "Local AEM SDK Instance",
    subtitle: "Full control — runs on your machine",
    icon: "💻",
    color: "#2E7D32",
    lightColor: "#EDF7EE",
    borderColor: "#88C98A",
    badge: "Offline-capable",
    intro: "The AEM SDK quickstart JAR runs a full author instance locally. Faster iteration, no cloud dependency — requires JDK 11 and ~4 GB RAM.",
    link: { label: "Open Software Distribution ↗", url: "https://experience.adobe.com/#/downloads/content/software-distribution" },
    steps: [
      { id: "lc1", title: "Download JDK 11", detail: "Go to Software Distribution (link above) → search 'OpenJDK 11'. Download for your OS, install it, and confirm with: java -version" },
      { id: "lc2", title: "Download the AEM SDK", detail: "In Software Distribution, search 'AEM SDK'. Download the latest AEM as a Cloud Service SDK ZIP and extract it — the quickstart JAR is inside." },
      { id: "lc3", title: "Create a working directory", detail: "Create a dedicated folder:\nmkdir ~/aem-local && cd ~/aem-local\nCopy the quickstart JAR into this folder." },
      { id: "lc4", title: "Start the author instance", detail: "Run:\njava -jar aem-sdk-quickstart-*.jar -r author\n\nFirst startup takes 5–15 minutes. A browser tab opens automatically when AEM is ready." },
      { id: "lc5", title: "Log in", detail: "Go to http://localhost:4502 — credentials are admin / admin. You should land on the AEM navigation screen." },
      { id: "lc6", title: "Verify and bookmark", detail: "Navigate to Tools → General → Templates to confirm full access. Bookmark localhost:4502 and localhost:4502/system/console (Felix OSGi console)." },
    ]
  }
];

export default function AEMStudyTracker() {
  const [completedExercises, setCompletedExercises] = useState({});
  const [completedSlots, setCompletedSlots] = useState({});
  const [completedSetupSteps, setCompletedSetupSteps] = useState({});
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeDomain, setActiveDomain] = useState("business");
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [studyNotes, setStudyNotes] = useState({});
  const [noteInput, setNoteInput] = useState("");
  const [activeNoteId, setActiveNoteId] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aem_tracker");
      if (saved) {
        const { exercises, slots, notes } = JSON.parse(saved);
        if (exercises) setCompletedExercises(exercises);
        if (slots) setCompletedSlots(slots);
        if (notes) setStudyNotes(notes);
      }
    } catch (e) {}
  }, []);

  const save = (exercises, slots, notes) => {
    try {
      localStorage.setItem("aem_tracker", JSON.stringify({ exercises, slots, notes }));
    } catch (e) {}
  };

  const toggleExercise = (id) => {
    const updated = { ...completedExercises, [id]: !completedExercises[id] };
    setCompletedExercises(updated);
    save(updated, completedSlots, studyNotes);
  };

  const toggleSlot = (idx) => {
    const updated = { ...completedSlots, [idx]: !completedSlots[idx] };
    setCompletedSlots(updated);
    save(completedExercises, updated, studyNotes);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aem_tracker_setup");
      if (saved) setCompletedSetupSteps(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const toggleSetupStep = (id) => {
    const updated = { ...completedSetupSteps, [id]: !completedSetupSteps[id] };
    setCompletedSetupSteps(updated);
    try { localStorage.setItem("aem_tracker_setup", JSON.stringify(updated)); } catch (e) {}
  };

  const saveNote = (id) => {
    const updated = { ...studyNotes, [id]: noteInput };
    setStudyNotes(updated);
    setActiveNoteId(null);
    setNoteInput("");
    save(completedExercises, completedSlots, updated);
  };

  const allExercises = [
    ...DOMAINS.flatMap(d => d.exercises),
    ...ADDITIONAL_TOPICS.flatMap(t => t.exercises)
  ];
  const totalExercises = allExercises.length;
  const completedCount = allExercises.filter(e => completedExercises[e.id]).length;
  const progress = Math.round((completedCount / totalExercises) * 100);

  const domainProgress = (domain) => {
    const exs = domain.exercises;
    const done = exs.filter(e => completedExercises[e.id]).length;
    return { done, total: exs.length, pct: exs.length ? Math.round((done / exs.length) * 100) : 0 };
  };

  const slotsCompleted = CALENDAR_SLOTS.filter((_, i) => completedSlots[i]).length;

  const sandboxReady = SETUP_PATHS.some(p => p.steps.every(s => completedSetupSteps[s.id]));

  const difficultyColor = (d) => d === "Easy" ? "#2E7D32" : d === "Medium" ? "#E65100" : "#C94F2C";

  const exerciseLookup = {};
  DOMAINS.forEach(d => {
    d.exercises.forEach(ex => { exerciseLookup[ex.id] = { exercise: ex, tab: "exercises", domain: d.id }; });
  });
  ADDITIONAL_TOPICS.forEach(t => {
    t.exercises.forEach(ex => { exerciseLookup[ex.id] = { exercise: ex, tab: "additional", domain: null }; });
  });

  const navigateToExercise = (id) => {
    const entry = exerciseLookup[id];
    if (!entry) return;
    setActiveTab(entry.tab);
    if (entry.domain) setActiveDomain(entry.domain);
    setExpandedExercise(id);
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: "#F7F8FA", minHeight: "100vh", color: "#1A1A2E" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 60%, #0F3460 100%)", color: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 28px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#E94560", textTransform: "uppercase", marginBottom: 6 }}>Adobe Certification Prep</div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>AEM Sites Business Practitioner Expert</h1>
            <div style={{ fontSize: 13, color: "#A0AEC0", marginTop: 4 }}>AD0-E121 · 50 questions · 32/50 to pass · 100 min · $225</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#E94560", lineHeight: 1 }}>{progress}%</div>
            <div style={{ fontSize: 11, color: "#A0AEC0", marginTop: 2 }}>{completedCount}/{totalExercises} exercises done</div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div style={{ marginTop: 16, background: "rgba(255,255,255,0.1)", borderRadius: 8, height: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg, #E94560, #FF6B6B)", borderRadius: 8, width: `${progress}%`, transition: "width 0.5s ease" }} />
        </div>

        {/* Domain weight pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          {DOMAINS.map(d => {
            const p = domainProgress(d);
            return (
              <div key={d.id} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "4px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 6, border: "1px solid rgba(255,255,255,0.12)" }}>
                <span>{d.icon}</span>
                <span style={{ fontWeight: 600 }}>{d.label}</span>
                <span style={{ color: "#A0AEC0" }}>{d.weight}%</span>
                <span style={{ color: p.pct === 100 ? "#68D391" : "#A0AEC0" }}>· {p.done}/{p.total}</span>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ background: "white", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", display: "flex", gap: 0, overflowX: "auto" }}>
        {[
          { id: "prereqs", label: "🚀 Setup Guide" },
          { id: "dashboard", label: "📋 Dashboard" },
          { id: "schedule", label: "📅 Study Schedule" },
          { id: "exercises", label: "🧪 Exercises" },
          { id: "topics", label: "📖 All Topics" },
          { id: "additional", label: "➕ Extra Material" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "14px 18px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? "#E94560" : "#718096", borderBottom: activeTab === tab.id ? "2px solid #E94560" : "2px solid transparent", whiteSpace: "nowrap", transition: "all 0.15s" }}>
            {tab.label}
          </button>
        ))}
        </div>
      </div>

      <div style={{ padding: "24px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* SETUP GUIDE */}
        {activeTab === "prereqs" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #0F3460, #1B6CA8)", borderRadius: 12, padding: "24px 28px", marginBottom: 28, color: "white" }}>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Before You Begin: Set Up Your Sandbox</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>All exercises require a live AEM environment. Choose one path below — Cloud Manager is recommended for most learners.</div>
              {sandboxReady && (
                <div style={{ marginTop: 12, background: "rgba(104,211,145,0.2)", border: "1px solid rgba(104,211,145,0.5)", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#68D391", fontWeight: 600, display: "inline-block" }}>
                  ✓ Sandbox setup complete — you're ready to start the exercises
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))", gap: 24, marginBottom: 24 }}>
              {SETUP_PATHS.map(path => {
                const stepsComplete = path.steps.filter(s => completedSetupSteps[s.id]).length;
                const allDone = stepsComplete === path.steps.length;
                return (
                  <div key={path.id} style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden", border: `2px solid ${allDone ? path.color : "transparent"}` }}>
                    <div style={{ background: path.lightColor, borderBottom: `1px solid ${path.borderColor}`, padding: "18px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 26 }}>{path.icon}</span>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: 15, color: path.color }}>{path.title}</div>
                            <div style={{ fontSize: 12, color: "#718096", marginTop: 1 }}>{path.subtitle}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ background: path.color, color: "white", fontSize: 11, fontWeight: 700, borderRadius: 12, padding: "3px 10px" }}>{path.badge}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: allDone ? "#2E7D32" : path.color }}>{stepsComplete}/{path.steps.length}</span>
                        </div>
                      </div>
                      <div style={{ background: path.borderColor, borderRadius: 6, height: 5, overflow: "hidden", marginBottom: 10 }}>
                        <div style={{ height: "100%", background: path.color, borderRadius: 6, width: `${(stepsComplete / path.steps.length) * 100}%`, transition: "width 0.4s ease" }} />
                      </div>
                      <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>{path.intro}</div>
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      <div style={{ marginBottom: 14 }}>
                        <a href={path.link.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", background: path.lightColor, border: `1px solid ${path.borderColor}`, borderRadius: 8, fontSize: 12, fontWeight: 700, color: path.color, textDecoration: "none" }}>
                          {path.link.label}
                        </a>
                      </div>
                      <div style={{ display: "grid", gap: 8 }}>
                        {path.steps.map((step, i) => {
                          const done = completedSetupSteps[step.id];
                          return (
                            <div key={step.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", background: done ? "#F0FFF4" : "#F7F8FA", borderRadius: 10, border: `1px solid ${done ? "#C6F6D5" : "#E2E8F0"}` }}>
                              <button onClick={() => toggleSetupStep(step.id)} style={{ width: 26, height: 26, borderRadius: "50%", border: `2px solid ${done ? "#48BB78" : "#CBD5E0"}`, background: done ? "#48BB78" : "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontSize: 12, color: "white", fontWeight: 800 }}>
                                {done ? "✓" : ""}
                              </button>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: done ? "#48BB78" : path.color, color: "white", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                                  <div style={{ fontWeight: 700, fontSize: 13, color: done ? "#276749" : "#2D3748", textDecoration: done ? "line-through" : "none" }}>{step.title}</div>
                                </div>
                                <div style={{ fontSize: 12, color: "#718096", lineHeight: 1.6, paddingLeft: 28, whiteSpace: "pre-line" }}>{step.detail}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {allDone && (
                        <div style={{ marginTop: 14, background: "#F0FFF4", border: "1px solid #9AE6B4", borderRadius: 10, padding: "12px 14px", fontSize: 13, fontWeight: 700, color: "#276749", textAlign: "center" }}>
                          ✓ Setup complete — head to the Dashboard to begin
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#FFFBEB", border: "1px solid #F6E05E", borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#744210", marginBottom: 10 }}>💡 Which path should I choose?</div>
              <div style={{ display: "grid", gap: 8, fontSize: 13, color: "#4A5568", lineHeight: 1.6 }}>
                <div><strong>Cloud Manager:</strong> Best for most learners. No JDK setup, always on the latest AEMaaCS release, and mirrors exactly what customers run. Requires an Adobe ID and access to a Cloud Manager organization.</div>
                <div><strong>Local SDK:</strong> Best if you need to work offline or want to experiment freely without risk to a shared environment. Requires JDK 11, ~4 GB RAM, and ~10 GB disk space.</div>
                <div style={{ color: "#718096" }}>Both paths give you the same AEM features needed for every exercise in this tracker.</div>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            {!sandboxReady && (
              <div style={{ background: "#EBF8FF", border: "1px solid #90CDF4", borderRadius: 12, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 22 }}>🚀</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#2B6CB0" }}>Set up your sandbox before starting</div>
                  <div style={{ fontSize: 13, color: "#4A5568", marginTop: 2 }}>The exercises require a live AEM environment — Cloud Manager or a local SDK instance.</div>
                </div>
                <button onClick={() => setActiveTab("prereqs")} style={{ padding: "8px 16px", background: "#2B6CB0", color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                  Setup Guide →
                </button>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
              {[
                { label: "Exercises Complete", value: `${completedCount}/${totalExercises}`, sub: `${progress}% done`, color: "#E94560" },
                { label: "Study Sessions Done", value: `${slotsCompleted}/${CALENDAR_SLOTS.length}`, sub: "steps completed", color: "#1B6CA8" },
                { label: "Passing Score Needed", value: "32/50", sub: "64% to pass", color: "#2E7D32" },
                { label: "Time Per Session", value: "~90 min", sub: "avg study block", color: "#6A1B9A" },
              ].map(stat => (
                <div key={stat.label} style={{ background: "white", borderRadius: 12, padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderTop: `3px solid ${stat.color}` }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#2D3748", marginTop: 2 }}>{stat.label}</div>
                  <div style={{ fontSize: 11, color: "#A0AEC0", marginTop: 2 }}>{stat.sub}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#2D3748" }}>Progress by Domain</h2>
            <div style={{ display: "grid", gap: 14 }}>
              {DOMAINS.map(d => {
                const p = domainProgress(d);
                return (
                  <div key={d.id} style={{ background: "white", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ fontSize: 28 }}>{d.icon}</div>
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{d.label} <span style={{ fontWeight: 400, color: "#A0AEC0", fontSize: 12 }}>({d.weight}% of exam)</span></div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: d.color }}>{p.pct}%</div>
                      </div>
                      <div style={{ background: "#EDF2F7", borderRadius: 8, height: 8, overflow: "hidden" }}>
                        <div style={{ height: "100%", background: d.color, borderRadius: 8, width: `${p.pct}%`, transition: "width 0.4s ease" }} />
                      </div>
                      <div style={{ fontSize: 11, color: "#718096", marginTop: 4 }}>{p.done} of {p.total} exercises completed</div>
                    </div>
                    <button onClick={() => { setActiveTab("exercises"); setActiveDomain(d.id); }} style={{ padding: "8px 16px", background: d.lightColor, border: `1px solid ${d.borderColor}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: d.color, cursor: "pointer" }}>
                      Study →
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 24, background: "#FFF8E1", border: "1px solid #FFD54F", borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#E65100", marginBottom: 8 }}>⚡ Quick Links — Official Resources</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { label: "Practice Quiz — self-paced (35 Qs)", url: "/aem-exam-prep.html", highlight: true },
                  { label: "Timed Practice Quiz (35 Qs, 70 min)", url: "/aem-exam-prep.html?timed=true", highlight: false },
                  { label: "Mock Exam — new questions (35 Qs)", url: "/mock-exam.html", highlight: false },
                  { label: "Final Exam + Gap Review (35 Qs)", url: "/final-exam.html", highlight: false },
                  { label: "Official Prep Course", url: "https://certification.adobe.com/courses/1177" },
                  { label: "Experience League Docs", url: "https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/overview/introduction.html" },
                  { label: "AEM Sites Authoring Guide", url: "https://experienceleague.adobe.com/docs/experience-manager-65/authoring/home.html" },
                  { label: "Core Components Docs", url: "https://experienceleague.adobe.com/docs/experience-manager-core-components/using/introduction.html" },
                  { label: "Free Sample Questions (EDUSUM)", url: "https://www.edusum.com/adobe/adobe-experience-manager-sites-business-practitioner-expert-ad0-e121-certification-sample" },
                ].map(link => (
                  <a key={link.label} href={link.url} target={link.highlight ? "_blank" : "_blank"} rel="noopener noreferrer" style={{ padding: "7px 14px", background: link.highlight ? "#E65100" : "white", border: `1px solid ${link.highlight ? "#E65100" : "#FFD54F"}`, borderRadius: 8, fontSize: 12, fontWeight: 600, color: link.highlight ? "white" : "#E65100", textDecoration: "none" }}>
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCHEDULE */}
        {activeTab === "schedule" && (
          <div>
            <div style={{ background: "#EBF8FF", border: "1px solid #90CDF4", borderRadius: 12, padding: 16, marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#2B6CB0" }}>Recommended Study Sequence</div>
              <div style={{ fontSize: 13, color: "#4A5568", marginTop: 4 }}>{slotsCompleted} of {CALENDAR_SLOTS.length} sessions completed — work through these in order, at your own pace.</div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {CALENDAR_SLOTS.map((slot, idx) => {
                const done = completedSlots[idx];
                const domain = DOMAIN_MAP[slot.domain];
                return (
                  <div key={idx} style={{ background: "white", borderRadius: 12, padding: "16px 18px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 14, borderLeft: `4px solid ${done ? "#68D391" : slot.color}`, opacity: done ? 0.75 : 1 }}>
                    <button onClick={() => toggleSlot(idx)} style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${done ? "#68D391" : "#CBD5E0"}`, background: done ? "#68D391" : "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, color: "white", fontWeight: 800 }}>
                      {done ? "✓" : ""}
                    </button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#2D3748", textDecoration: done ? "line-through" : "none" }}>{slot.topic}</div>
                      <div style={{ fontSize: 12, color: slot.color, fontWeight: 600, marginTop: 2 }}>{domain?.label}</div>
                      {slot.exerciseIds.length > 0 && (
                        <div style={{ display: "flex", gap: 4, marginTop: 7, flexWrap: "wrap" }}>
                          {slot.exerciseIds.map(id => {
                            const entry = exerciseLookup[id];
                            if (!entry) return null;
                            const exDone = completedExercises[id];
                            const exColor = entry.domain ? (DOMAIN_MAP[entry.domain]?.color || "#718096") : "#E65100";
                            const title = entry.exercise.title.length > 30 ? entry.exercise.title.slice(0, 27) + "…" : entry.exercise.title;
                            return (
                              <button key={id} onClick={() => navigateToExercise(id)} style={{ fontSize: 11, color: exDone ? "#276749" : exColor, background: exDone ? "#F0FFF4" : "white", border: `1px solid ${exDone ? "#9AE6B4" : "#E2E8F0"}`, borderRadius: 6, padding: "3px 9px", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}>
                                {exDone ? "✓ " : ""}{title} →
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {slot.quizLink && (
                        <div style={{ marginTop: 7 }}>
                          <a href={slot.quizLink} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#C53030", background: "white", border: "1px solid #E2E8F0", borderRadius: 6, padding: "3px 9px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                            Practice Quiz →
                          </a>
                        </div>
                      )}
                    </div>
                    {slot.domain === "practice" && (
                      <div style={{ fontSize: 11, background: "#E53E3E", color: "white", borderRadius: 6, padding: "3px 8px", fontWeight: 700 }}>EXAM SIM</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* EXERCISES */}
        {activeTab === "exercises" && (
          <div>
            {/* Domain selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {DOMAINS.map(d => {
                const p = domainProgress(d);
                const active = activeDomain === d.id;
                return (
                  <button key={d.id} onClick={() => setActiveDomain(d.id)} style={{ padding: "8px 16px", borderRadius: 24, border: `2px solid ${active ? d.color : "#E2E8F0"}`, background: active ? d.color : "white", color: active ? "white" : "#4A5568", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
                    {d.icon} {d.label} ({p.done}/{p.total})
                  </button>
                );
              })}
            </div>

            {DOMAINS.filter(d => d.id === activeDomain).map(domain => (
              <div key={domain.id}>
                <div style={{ background: domain.lightColor, border: `1px solid ${domain.borderColor}`, borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: domain.color }}>{domain.icon} {domain.label} — {domain.weight}% of exam</div>
                  <div style={{ fontSize: 13, color: "#4A5568", marginTop: 6 }}>{domain.description}</div>
                </div>

                <div style={{ display: "grid", gap: 16 }}>
                  {domain.exercises.map(ex => {
                    const done = completedExercises[ex.id];
                    const expanded = expandedExercise === ex.id;
                    const hasNote = studyNotes[ex.id];
                    return (
                      <div key={ex.id} style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: `1px solid ${done ? "#C6F6D5" : "#E2E8F0"}`, overflow: "hidden" }}>
                        <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }} onClick={() => setExpandedExercise(expanded ? null : ex.id)}>
                          <button onClick={(e) => { e.stopPropagation(); toggleExercise(ex.id); }} style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${done ? "#48BB78" : "#CBD5E0"}`, background: done ? "#48BB78" : "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, color: "white", fontWeight: 800 }}>
                            {done ? "✓" : ""}
                          </button>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "#2D3748", textDecoration: done ? "line-through" : "none" }}>{ex.title}</div>
                            <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                              <span style={{ fontSize: 11, background: "#EDF2F7", borderRadius: 6, padding: "2px 8px", color: "#4A5568" }}>⏱ {ex.duration}</span>
                              <span style={{ fontSize: 11, background: "#EDF2F7", borderRadius: 6, padding: "2px 8px", color: difficultyColor(ex.difficulty), fontWeight: 700 }}>{ex.difficulty}</span>
                              <span style={{ fontSize: 11, background: domain.lightColor, borderRadius: 6, padding: "2px 8px", color: domain.color, fontWeight: 600 }}>📍 {ex.path}</span>
                              {hasNote && <span style={{ fontSize: 11, background: "#FFF8E1", borderRadius: 6, padding: "2px 8px", color: "#E65100" }}>📝 Note</span>}
                            </div>
                          </div>
                          <div style={{ fontSize: 16, color: "#A0AEC0", transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>▼</div>
                        </div>

                        {expanded && (
                          <div style={{ borderTop: "1px solid #EDF2F7", padding: "16px 20px" }}>
                            <div style={{ marginBottom: 16 }}>
                              <div style={{ fontWeight: 700, fontSize: 12, color: "#718096", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Steps</div>
                              <div style={{ display: "grid", gap: 8 }}>
                                {ex.steps.map((step, i) => (
                                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: domain.color, color: "white", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                                    <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>{step}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div style={{ background: "#FFFBEB", border: "1px solid #F6E05E", borderRadius: 10, padding: "12px 14px" }}>
                              <div style={{ fontWeight: 700, fontSize: 12, color: "#744210", marginBottom: 4 }}>🔑 Key Insight (exam-relevant)</div>
                              <div style={{ fontSize: 13, color: "#744210", lineHeight: 1.5 }}>{ex.keyInsight}</div>
                            </div>

                            <div style={{ marginTop: 14 }}>
                              {activeNoteId === ex.id ? (
                                <div>
                                  <textarea value={noteInput} onChange={e => setNoteInput(e.target.value)} placeholder="Add your study notes here..." style={{ width: "100%", height: 80, padding: 10, fontSize: 13, borderRadius: 8, border: "1px solid #CBD5E0", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
                                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                                    <button onClick={() => saveNote(ex.id)} style={{ padding: "7px 14px", background: domain.color, color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Save Note</button>
                                    <button onClick={() => setActiveNoteId(null)} style={{ padding: "7px 14px", background: "#EDF2F7", color: "#4A5568", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  {hasNote && <div style={{ fontSize: 13, color: "#4A5568", background: "#F7FAFC", borderRadius: 8, padding: "10px 12px", marginBottom: 8, lineHeight: 1.5 }}>📝 {studyNotes[ex.id]}</div>}
                                  <button onClick={() => { setActiveNoteId(ex.id); setNoteInput(studyNotes[ex.id] || ""); }} style={{ padding: "6px 14px", background: "#EDF2F7", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#4A5568", cursor: "pointer" }}>
                                    {hasNote ? "Edit Note ✏️" : "+ Add Study Note"}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ALL TOPICS */}
        {activeTab === "topics" && (
          <div>
            <div style={{ display: "grid", gap: 20 }}>
              {DOMAINS.map(domain => (
                <div key={domain.id} style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <div style={{ background: domain.color, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{domain.icon}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "white" }}>{domain.label}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{domain.weight}% of exam · {domain.exercises.length} sandbox exercises</div>
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "#718096", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Topics to Master</div>
                    <div style={{ display: "grid", gap: 6 }}>
                      {domain.topics.map((t, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: domain.color, flexShrink: 0, marginTop: 7 }} />
                          <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>{t}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADDITIONAL MATERIAL */}
        {activeTab === "additional" && (
          <div>
            <div style={{ background: "#F0FFF4", border: "1px solid #9AE6B4", borderRadius: 12, padding: 16, marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#276749" }}>➕ Additional Material for Expert-Level Mastery</div>
              <div style={{ fontSize: 13, color: "#4A5568", marginTop: 4 }}>These topics go beyond the core four domains and reflect the Expert-level depth the exam expects. Budget 1–2 days across your 2-month prep.</div>
            </div>

            <div style={{ display: "grid", gap: 20 }}>
              {ADDITIONAL_TOPICS.map(topic => (
                <div key={topic.id} style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <div style={{ background: topic.color, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{topic.icon}</span>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 15, color: "white" }}>{topic.label}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{topic.exercises.length} exercise{topic.exercises.length !== 1 ? "s" : ""}</div>
                      </div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700, color: "white" }}>
                      {topic.weight}
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ background: "#FFFBEB", border: "1px solid #FBD38D", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#744210" }}>
                      <strong>Why study this:</strong> {topic.why}
                    </div>

                    <div style={{ fontWeight: 700, fontSize: 12, color: "#718096", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Topics</div>
                    <div style={{ display: "grid", gap: 5, marginBottom: 16 }}>
                      {topic.topics.map((t, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: topic.color, flexShrink: 0, marginTop: 7 }} />
                          <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>{t}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontWeight: 700, fontSize: 12, color: "#718096", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Exercises</div>
                    <div style={{ display: "grid", gap: 12 }}>
                      {topic.exercises.map(ex => {
                        const done = completedExercises[ex.id];
                        const expanded = expandedExercise === ex.id;
                        return (
                          <div key={ex.id} style={{ border: `1px solid ${done ? "#C6F6D5" : "#E2E8F0"}`, borderRadius: 10, overflow: "hidden" }}>
                            <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setExpandedExercise(expanded ? null : ex.id)}>
                              <button onClick={(e) => { e.stopPropagation(); toggleExercise(ex.id); }} style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${done ? "#48BB78" : "#CBD5E0"}`, background: done ? "#48BB78" : "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: "white", fontWeight: 800 }}>
                                {done ? "✓" : ""}
                              </button>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: 13, color: "#2D3748", textDecoration: done ? "line-through" : "none" }}>{ex.title}</div>
                                <div style={{ display: "flex", gap: 6, marginTop: 3, flexWrap: "wrap" }}>
                                  <span style={{ fontSize: 11, background: "#EDF2F7", borderRadius: 5, padding: "2px 7px", color: "#4A5568" }}>⏱ {ex.duration}</span>
                                  <span style={{ fontSize: 11, background: topic.lightColor, borderRadius: 5, padding: "2px 7px", color: topic.color, fontWeight: 600 }}>📍 {ex.path}</span>
                                </div>
                              </div>
                              <div style={{ fontSize: 14, color: "#A0AEC0", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</div>
                            </div>
                            {expanded && (
                              <div style={{ borderTop: "1px solid #EDF2F7", padding: "14px 16px" }}>
                                <div style={{ display: "grid", gap: 7, marginBottom: 12 }}>
                                  {ex.steps.map((step, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: topic.color, color: "white", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                                      <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>{step}</div>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ background: "#FFFBEB", border: "1px solid #F6E05E", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#744210" }}>
                                  <strong>🔑 Key Insight:</strong> {ex.keyInsight}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
