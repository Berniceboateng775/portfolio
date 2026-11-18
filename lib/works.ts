/* ---------------------------------------------------------------
   Every project is a chapter. Facts here come from each project's
   README and code; numbers are the ones recorded there.
---------------------------------------------------------------- */

export interface Plate {
  src: string;
  caption: string;
  w: number;
  h: number;
}

export interface Work {
  slug: string;
  no: string;
  title: string;
  kind: string;
  tagline: string;
  year: string;
  status: string;
  summary: string;
  role: string;
  context: string;
  links: { label: string; href: string }[];
  lead?: Plate;
  overview: string[];
  flow: { step: string; via: string; text: string }[];
  figures?: { value: string; label: string }[];
  figuresNote?: string;
  stack: { group: string; items: string[] }[];
  notes: { title: string; text: string }[];
  plates: Plate[];
}

const p = (slug: string, file: string, caption: string, w: number, h: number): Plate => ({
  src: `/work/${slug}/${file}.webp`,
  caption,
  w,
  h,
});

export const works: Work[] = [
  {
    slug: 'medmate',
    no: '01',
    title: 'MedMate',
    kind: 'Clinical ML, full stack',
    tagline: 'checked before it reaches the patient.',
    year: '2025',
    status: 'Live',
    summary:
      'A drug interaction checker for clinicians. Add two or more medicines and every pair comes back rated for severity, described in plain language, and explained with safer alternatives.',
    role: 'T5 interaction model, severity classifiers',
    context: 'Final-year team project, University of Ghana',
    links: [
      { label: 'Open the app', href: 'https://medmate-ddi.vercel.app' },
      { label: 'API docs', href: 'https://medmate-backend-0hgo.onrender.com/api/docs/' },
      { label: 'Model on Hugging Face', href: 'https://huggingface.co/spaces/Bernice775/drug-interaction-prediction' },
      { label: 'Watch the demo', href: 'https://youtu.be/3Hjd1kbrc1A' },
    ],
    lead: p('medmate', 'home', 'Landing page', 1546, 765),
    overview: [
      'Prescribing errors often come from combinations, not single drugs. MedMate checks every pair in a list of medicines and returns a report a pharmacist can act on: how serious the interaction is, what actually happens when the two drugs meet, and what to use instead.',
      'Two models we trained do the core work. A severity classifier rates each pair mild, moderate or severe, and a T5 sequence-to-sequence model writes the interaction description. Gemini then writes the longer explanation, alternatives and sources, and the report labels every part with where it came from, so a clinician always knows which text is model output and which is generated.',
    ],
    flow: [
      { step: 'Medicines in', via: 'React 19 · Vite', text: 'The checker accepts up to eight medicines and pairs them up.' },
      { step: 'API', via: 'Django REST · Render', text: 'Each pair goes to /api/ddi/check/, which matches both compounds against DrugBank data.' },
      { step: 'Severity', via: 'Classifier · HF Spaces', text: 'Compounds are encoded from their SMILES structures and rated mild, moderate or severe.' },
      { step: 'Description', via: 'T5 · HF Spaces', text: 'A T5 model trained on pharmacological interaction data writes what changes when the two drugs meet.' },
      { step: 'Explanation', via: 'Gemini', text: 'Extended explanation, alternatives, a suggested combination and sources, marked as AI-generated.' },
      { step: 'Clinician portal', via: 'JWT · 2FA · passkeys', text: 'Doctors and pharmacists screen new prescriptions against each patient’s current medicines.' },
    ],
    figures: [
      { value: '2', label: 'models trained for the core report' },
      { value: '3', label: 'severity levels: mild, moderate, severe' },
      { value: '4', label: 'roles: superuser, admin, doctor, pharmacist' },
    ],
    stack: [
      { group: 'Machine learning', items: ['T5 (Transformers)', 'Severity classifier', 'DrugBank + SMILES', 'Gemini'] },
      { group: 'Backend', items: ['Django 5.2', 'Django REST Framework', 'PostgreSQL', 'Gradio client', 'SendGrid'] },
      { group: 'Front end', items: ['React 19', 'Vite', 'Tailwind CSS', 'Recharts'] },
      { group: 'Hosting', items: ['Vercel', 'Render', 'Hugging Face Spaces'] },
    ],
    notes: [
      { title: 'Provenance on every line', text: 'Model output and Gemini text are badged separately in each report, so generated advice is never mistaken for a trained model’s prediction.' },
      { title: 'Honest about cold starts', text: 'The models sleep when idle on free hosting. Instead of a spinner, the checker shows each stage as it runs, so a slow first check reads as progress, not a hang.' },
      { title: 'Clinical-grade sign-in', text: 'JWT with refresh tokens, two-factor authentication, WebAuthn passkeys, rate limits on sensitive endpoints and session timeouts.' },
    ],
    plates: [
      p('medmate', 'checker', 'Checker, running the models on a pair', 1544, 771),
      p('medmate', 'report', 'Interaction report: severity, description, alternatives, sources', 1547, 770),
      p('medmate', 'models', 'How the models fit together', 1550, 711),
      p('medmate', 'signin', 'Clinician portal sign-in', 1562, 771),
    ],
  },
  {
    slug: 'vellichor',
    no: '02',
    title: 'Vellichor',
    kind: 'NLP, full stack',
    tagline: 'reads the subtext, not the words.',
    year: '2026',
    status: 'Live',
    summary:
      'Shows how a piece of fiction feels. A GPT-2 model I fine-tuned reads subtext rather than keywords across seven emotions; the app around it reads whole PDFs, talks books through and suggests what to read next.',
    role: 'Everything: data, model, API, app',
    context: 'National Service training programme',
    links: [
      { label: 'Open the app', href: 'https://vellichor-ai.vercel.app' },
      { label: 'Model on Hugging Face', href: 'https://huggingface.co/Bernice775/vellichor' },
      { label: 'Code', href: 'https://github.com/Berniceboateng775/nsp-training-program' },
      { label: 'Watch the demo', href: 'https://youtu.be/8AguS4kIdXQ' },
    ],
    lead: p('vellichor', 'home', 'Landing page', 1558, 771),
    overview: [
      'Off-the-shelf emotion models read surface words. Given a threat from a dark romance villain they answer “connection”; given an angry refund request, “sadness, 98%”. Vellichor needed a model that reads a scene the way a reader does.',
      'GPT-2 was the brief, so I turned a model built to write text into a classifier. It stalled at 57% accuracy until the cause became clear: single lines of dialogue carry too little context. Feeding the situation alongside the dialogue, then regularising hard against memorisation, took it to 79%.',
    ],
    flow: [
      { step: 'Re-label', via: 'EmpatheticDialogues', text: '32 imbalanced emotion labels regrouped into 7 balanced categories.' },
      { step: 'Add context', via: 'Input engineering', text: 'Each example becomes “Situation: … Dialogue: …”, which broke the 57% plateau.' },
      { step: 'Fine-tune', via: 'GPT-2 · PyTorch', text: 'EOS as pad token, left padding, dropout 0.2, weight decay 0.15, cosine schedule with warm-up, early stopping.' },
      { step: 'Serve', via: 'FastAPI · Docker · Render', text: 'Weights on the Hugging Face Hub, served as a REST API.' },
      { step: 'Read a book', via: 'FastAPI · MongoDB · JWT', text: 'Upload a PDF or paste a scene; the app returns the emotion mix with charts.' },
      { step: 'Discover', via: 'MiniLM · FAISS · Open Library', text: 'Semantic search and recommendations by mood and genre.' },
    ],
    figures: [
      { value: '79%', label: 'accuracy reading 7 emotions from subtext' },
      { value: '7', label: 'emotions, regrouped from 32 imbalanced labels' },
    ],
    stack: [
      { group: 'Machine learning', items: ['GPT-2', 'PyTorch', 'Hugging Face Transformers', 'DistilBERT', 'MiniLM', 'FAISS'] },
      { group: 'Backend', items: ['FastAPI', 'MongoDB + Motor', 'JWT auth'] },
      { group: 'Front end', items: ['HTML, CSS, JavaScript', 'Chart.js'] },
      { group: 'Hosting', items: ['Docker', 'Render', 'Vercel', 'Hugging Face Hub'] },
    ],
    notes: [
      { title: 'Finding the 57% wall', text: 'Tuning the learning rate (1e-5 to 3e-5) changed nothing. Reading the misclassified rows did: “I can’t believe this happened!” is joy or anger depending on what came before.' },
      { title: 'Cross-checked on a real novel', text: 'Chapter 1 of King of Envy came back Fear & Tension 36%, Vulnerability 25%, Anger 19%. An independent read by Gemini Pro agreed with the breakdown.' },
    ],
    plates: [
      p('vellichor', 'mood', 'Mood Reader: a scene broken into emotions', 1559, 769),
      p('vellichor', 'dashboard', 'Reader home', 1559, 771),
      p('vellichor', 'chat', 'Book Chat', 1558, 764),
      p('vellichor', 'discover', 'Discover, by mood and genre', 1560, 771),
    ],
  },
  {
    slug: 'limerence',
    no: '03',
    title: 'Limerence',
    kind: 'Product, web + mobile',
    tagline: 'a social life built around books.',
    year: '2026',
    status: 'In development',
    summary:
      'A social reading app for romance readers and writers: shelves and a reading journal, clubs and live chat, stories, and a writing desk for original fiction. Web, mobile and a real-time backend, built end to end.',
    role: 'Design, front end, back end, mobile',
    context: 'Independent product',
    links: [],
    lead: p('limerence', 'poster', 'Limerence', 1800, 1012),
    overview: [
      'Limerence tracks the books people read elsewhere and builds a social life around them: a library with real shelves, a reading journal per book, clubs that chat around a current read, and pins for milestones. Writers can publish original stories that readers comment on paragraph by paragraph.',
      'It is the largest thing I have built: a React web app, an Expo mobile app and a Node API sharing one backend, with live chat, notifications and presence over Socket.IO, and an AI reading companion called Muse.',
    ],
    flow: [
      { step: 'Clients', via: 'React 19 · Vite · Expo', text: 'Web and mobile apps share the same API and live connection.' },
      { step: 'API', via: 'Node · Express · JWT', text: 'Email and Google sign-in (Firebase), one route file per area: shelves, journal, clubs, posts, writing, admin.' },
      { step: 'Data', via: 'MongoDB · Mongoose', text: 'Readers, books, shelves, journals, clubs, chats and stories.' },
      { step: 'Live', via: 'Socket.IO', text: 'Chat, typing, read receipts, notifications and who is online, across server processes.' },
      { step: 'Books', via: 'Hardcover API', text: 'Book data with Google Books and Open Library as fallbacks; cover colours tint club wallpapers.' },
      { step: 'Muse', via: 'Gemini · on-device embeddings', text: 'A reading companion (Groq as backup) and recommendations from text embeddings.' },
    ],
    figures: [
      { value: '80+', label: 'genres and tropes to browse by mood' },
      { value: '32', label: 'collectable reading pins' },
      { value: '3', label: 'apps on one backend: web, mobile, API' },
      { value: '600+', label: 'commits so far' },
    ],
    stack: [
      { group: 'Front end', items: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Radix, shadcn/ui', 'Tiptap editor'] },
      { group: 'Mobile', items: ['Expo 54', 'React Native', 'Expo Router'] },
      { group: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'BullMQ + Redis'] },
      { group: 'AI and services', items: ['Gemini, Groq', 'transformers.js embeddings', 'Cloudinary', 'Hardcover API'] },
    ],
    notes: [
      { title: 'Built to carry load', text: 'One server process per CPU core with crash replacement, password hashing on worker threads, rate limits shared through Redis, and background jobs that retry.' },
      { title: 'Tested like production', text: 'npm run loadtest spins up a throwaway in-memory database and simulates a sign-up rush and live chat, so it never touches real data.' },
      { title: 'Safety by design', text: 'Blocking hides people from each other everywhere; reports, appeals and an admin console handle moderation.' },
    ],
    plates: [
      p('limerence', 'genres', 'Genres and tropes, by mood', 1560, 766),
      p('limerence', 'explore', 'Explore: what everyone is shelving', 1559, 772),
      p('limerence', 'tropes', 'Romance tropes', 1560, 770),
      p('limerence', 'chat', 'Friends and chats, with book cards', 1558, 770),
    ],
  },
  {
    slug: 'cardioglobal',
    no: '04',
    title: 'CardioGlobal',
    kind: 'Health data, ML dashboard',
    tagline: 'where the world’s heart is heading.',
    year: '2026',
    status: 'Live',
    summary:
      'A dashboard for understanding cardiovascular disease worldwide: five tabs of mortality, demographics and risk factors for 195 countries, plus three models that predict, forecast and cluster.',
    role: 'Data, models, dashboard',
    context: 'Four-week data science capstone',
    links: [
      { label: 'Open the dashboard', href: 'https://cardioglobal.onrender.com' },
      { label: 'Code', href: 'https://github.com/Berniceboateng775/Heart-disease-project' },
    ],
    lead: p('cardioglobal', 'global', 'Global overview: age-standardised death rate', 1546, 765),
    overview: [
      'CardioGlobal joins WHO mortality data, World Bank economic indicators and the UCI Cleveland clinical dataset into one tool for researchers and health planners. Every chart and model updates live from a shared year and region filter.',
      'The machine learning tab answers three different questions: how likely is this patient to have heart disease, where is a country’s death rate heading, and which countries share a risk profile.',
    ],
    flow: [
      { step: 'Merge', via: 'pandas · country_converter', text: 'WHO GHO, World Bank and UCI data joined into a 195-country panel, 2000–2024.' },
      { step: 'Impute', via: 'MICE · ExtraTrees', text: 'Missing values imputed instead of dropped, so under-reporting countries are not excluded.' },
      { step: 'Risk predictor', via: 'Random Forest', text: '13 clinical features to a probability gauge with feature importance.' },
      { step: 'Forecaster', via: 'LightGBM', text: 'Trained on 2000–2019, tested on unseen 2020–2024, with what-if growth rates to 2050.' },
      { step: 'Clusters', via: 'UMAP · HDBSCAN', text: 'Four natural risk groups, plus how far each country drifted by 2019.' },
      { step: 'Dashboard', via: 'Dash · Plotly · Docker', text: 'Five tabs, models lazy-loaded on first use, deployed on Render.' },
    ],
    figures: [
      { value: '195', label: 'countries, 2000–2024' },
      { value: '0.90', label: 'ROC-AUC, patient risk predictor' },
      { value: '3', label: 'models: predict, forecast, cluster' },
    ],
    stack: [
      { group: 'Machine learning', items: ['scikit-learn', 'LightGBM', 'XGBoost', 'UMAP', 'HDBSCAN'] },
      { group: 'Data', items: ['pandas', 'NumPy', 'WHO GHO', 'World Bank'] },
      { group: 'App', items: ['Dash', 'Plotly', 'Flask'] },
      { group: 'Hosting', items: ['Docker', 'Render'] },
    ],
    notes: [
      { title: 'No leaking the future', text: 'All fitting on 2000–2019, all evaluation on 2020–2024, and cross-validation that only ever predicts forward in time.' },
      { title: 'Choosing the readable answer', text: 'A nine-cluster model scored a higher silhouette, but it over-split. The four-cluster model was kept because a planner can act on it.' },
    ],
    plates: [
      p('cardioglobal', 'ml', 'Patient risk predictor', 1542, 776),
      p('cardioglobal', 'forecast', 'Country forecast to 2030, with what-if inputs', 1550, 770),
      p('cardioglobal', 'economic', 'GDP per capita against mortality', 1541, 765),
      p('cardioglobal', 'regional', 'Regional comparison', 1546, 770),
      p('cardioglobal', 'risk', 'Indicator scatter', 1544, 672),
      p('cardioglobal', 'demographics', 'Mortality by age group', 1546, 767),
    ],
  },
  {
    slug: 'scripture-insight',
    no: '05',
    title: 'Scripture Insight',
    kind: 'RAG, MCP server',
    tagline: 'answers from the source, not memory.',
    year: '2026',
    status: 'Working tool',
    summary:
      'An MCP server that gives Claude ten tools for searching and studying the Bible: semantic search, passages, cross-references, characters, topics and timelines, all answered from a local vector database.',
    role: 'Everything',
    context: 'Personal project',
    links: [{ label: 'Code', href: 'https://github.com/Berniceboateng775/Scripture-Insight-MCP-Server' }],
    lead: p('scripture', 'search-verse', 'Semantic verse search inside Claude', 802, 499),
    overview: [
      'Language models misquote scripture. This server keeps the text itself out of the model’s memory: Claude calls a tool, the tool retrieves the exact verses, and Claude reasons over what came back.',
      'It is a small, clean example of retrieval-augmented generation over the Model Context Protocol.',
    ],
    flow: [
      { step: 'Ingest', via: 'helloao Bible API', text: 'The Berean Standard Bible fetched book by book with 66 parallel workers.' },
      { step: 'Embed', via: 'all-MiniLM-L6-v2', text: 'Verses embedded in batches of 100.' },
      { step: 'Store', via: 'ChromaDB', text: 'A persistent local vector collection with book, chapter and verse metadata.' },
      { step: 'Serve', via: 'FastMCP', text: 'Ten tools registered for Claude Desktop, split into tools, services and database layers.' },
    ],
    figures: [
      { value: '10', label: 'tools exposed to Claude' },
      { value: '66', label: 'books ingested in parallel' },
    ],
    stack: [
      { group: 'Retrieval', items: ['sentence-transformers', 'ChromaDB'] },
      { group: 'Protocol', items: ['MCP (FastMCP)', 'Claude Desktop'] },
      { group: 'Language', items: ['Python'] },
    ],
    notes: [
      { title: 'Retrieval, not invention', text: 'Every tool returns real verses; interpretation is left to the model, with the source text in front of it.' },
    ],
    plates: [
      p('scripture', 'theological-analysis', 'Context gathering for a verse', 741, 514),
      p('scripture', 'cross-reference', 'Cross-references', 874, 642),
      p('scripture', 'character-profile', 'Character profile', 895, 651),
      p('scripture', 'topic-lookup', 'Topic lookup', 1024, 555),
      p('scripture', 'summarize-passage', 'Passage summary', 755, 600),
    ],
  },
];

export const earlier = [
  { title: 'Diabetes prediction API', note: 'SVM served with FastAPI, 77% test accuracy', href: 'https://diabetes-predictor-64wt.onrender.com' },
  { title: 'Book collection system', note: 'MVC, React, Node, MongoDB', href: 'https://github.com/Berniceboateng775/Book-management-system-mvc' },
  { title: 'Multi-vendor e-commerce', note: 'HTML, CSS, JavaScript', href: 'https://github.com/Berniceboateng775/Project1-E-ccomerce' },
  { title: 'Smart dustbin', note: 'Arduino, ultrasonic sensing', href: '' },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
