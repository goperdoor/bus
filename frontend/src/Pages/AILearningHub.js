import React, { useState } from 'react';
import { ExternalLink, Search, Brain, GraduationCap, PenTool, BookOpen, Palette, Video, Code, Mic, BarChart, FileText, Plus, Minus } from 'lucide-react';

const AILearningHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const aiTools = {
    general: {
      title: "🧠 AI Tools for Everyone (General Use)",
      icon: <Brain className="w-5 h-5" />,
      tools: [
        { name: "ChatGPT", purpose: "Ask anything, writing, coding, explaining", link: "https://chat.openai.com" },
        { name: "Google Gemini", purpose: "Google's AI assistant (chat, help, research)", link: "https://gemini.google.com" },
        { name: "Perplexity AI", purpose: "AI-powered search engine with real-time browsing", link: "https://www.perplexity.ai" },
        { name: "You.com", purpose: "Private AI search and writing assistant", link: "https://you.com" },
        { name: "Claude", purpose: "Writing, chat, summarizing, analysis", link: "https://claude.ai" },
        { name: "Microsoft Copilot", purpose: "Built into Windows & MS Office (Word, Excel)", link: "https://copilot.microsoft.com" },
        { name: "Poe", purpose: "Access multiple AI models in one place", link: "https://poe.com" },
        { name: "Character.AI", purpose: "Chat with AI characters and personalities", link: "https://character.ai" }
      ]
    },
    students: {
      title: "🧑‍🎓 AI Tools for Students",
      icon: <GraduationCap className="w-5 h-5" />,
      tools: [
        { name: "Quillbot", purpose: "Paraphrasing and grammar checking", link: "https://quillbot.com" },
        { name: "Grammarly", purpose: "Writing improvement and grammar check", link: "https://www.grammarly.com" },
        { name: "Scribbr", purpose: "Plagiarism checker and citation generator", link: "https://www.scribbr.com" },
        { name: "Khanmigo", purpose: "Personalized learning help", link: "https://www.khanacademy.org" },
        { name: "SciSpace", purpose: "AI for understanding research papers", link: "https://typeset.io" },
        { name: "Explainpaper", purpose: "Explains research papers in simple language", link: "https://explainpaper.com" },
        { name: "Wolfram Alpha", purpose: "Math, science, and fact-based questions", link: "https://www.wolframalpha.com" },
        { name: "Consensus", purpose: "AI-powered research and academic search", link: "https://consensus.app" },
        { name: "Semantic Scholar", purpose: "AI-powered academic search engine", link: "https://www.semanticscholar.org" }
      ]
    },
    writing: {
      title: "✍️ Content Writing & Blog Tools",
      icon: <PenTool className="w-5 h-5" />,
      tools: [
        { name: "Writesonic", purpose: "Blog, ad copy, product descriptions", link: "https://writesonic.com" },
        { name: "Copy.ai", purpose: "Content generation for business & school", link: "https://copy.ai" },
        { name: "Jasper AI", purpose: "Advanced content writing", link: "https://www.jasper.ai" },
        { name: "INK Editor", purpose: "SEO writing tool", link: "https://inkforall.com" },
        { name: "Rytr", purpose: "AI writing assistant for various content types", link: "https://rytr.me" },
        { name: "Wordtune", purpose: "AI writing companion for rewriting", link: "https://www.wordtune.com" },
        { name: "Simplified", purpose: "All-in-one content creation platform", link: "https://simplified.com" }
      ]
    },
    learning: {
      title: "📚 Learning & Tutoring AI Tools",
      icon: <BookOpen className="w-5 h-5" />,
      tools: [
        { name: "Socratic by Google", purpose: "Solve questions using camera & explanations", link: "Play Store/App Store" },
        { name: "Photomath", purpose: "Solves math problems with step-by-step help", link: "https://photomath.com" },
        { name: "Tutor AI", purpose: "Learn any topic instantly", link: "https://tutorai.me" },
        { name: "StudyFetch", purpose: "AI study guide creator", link: "https://studyfetch.com" },
        { name: "Coursera Plus AI", purpose: "AI-powered course recommendations", link: "https://coursera.org" },
        { name: "Duolingo", purpose: "AI-powered language learning", link: "https://duolingo.com" },
        { name: "Brilliant", purpose: "Interactive AI-enhanced learning", link: "https://brilliant.org" }
      ]
    },
    design: {
      title: "🎨 AI Design & Image Tools",
      icon: <Palette className="w-5 h-5" />,
      tools: [
        { name: "Canva AI", purpose: "Auto-design, presentations", link: "https://www.canva.com" },
        { name: "Remove.bg", purpose: "Remove image backgrounds", link: "https://www.remove.bg" },
        { name: "Looka", purpose: "Logo generation", link: "https://looka.com" },
        { name: "Kittl", purpose: "Graphic design and logos", link: "https://www.kittl.com" },
        { name: "Leonardo.ai", purpose: "AI image generation for creatives", link: "https://leonardo.ai" },
        { name: "Adobe Firefly", purpose: "AI image and design tools", link: "https://firefly.adobe.com" },
        { name: "Craiyon", purpose: "Generate AI images", link: "https://www.craiyon.com" },
        { name: "Midjourney", purpose: "High-quality AI image generation", link: "https://midjourney.com" },
        { name: "DALL-E 3", purpose: "OpenAI's image generation model", link: "https://openai.com/dall-e-3" },
        { name: "Figma AI", purpose: "AI-powered design assistance in Figma", link: "https://figma.com" }
      ]
    },
    video: {
      title: "🎞️ AI Video Tools",
      icon: <Video className="w-5 h-5" />,
      tools: [
        { name: "Pictory", purpose: "Turn text into short videos", link: "https://pictory.ai" },
        { name: "Lumen5", purpose: "Video creation from blogs or text", link: "https://lumen5.com" },
        { name: "Runway ML", purpose: "AI video editing and Gen-2 video generation", link: "https://runwayml.com" },
        { name: "Synthesia", purpose: "Create AI avatars and talking videos", link: "https://www.synthesia.io" },
        { name: "HeyGen", purpose: "Talking AI avatars (voice + video)", link: "https://www.heygen.com" },
        { name: "Invideo AI", purpose: "AI video creation platform", link: "https://invideo.io" },
        { name: "Fliki", purpose: "Text to video with AI voices", link: "https://fliki.ai" },
        { name: "Steve AI", purpose: "Animated video creation", link: "https://steve.ai" }
      ]
    },
    coding: {
      title: "👩‍💻 Coding & Development Tools",
      icon: <Code className="w-5 h-5" />,
      tools: [
        { name: "GitHub Copilot", purpose: "AI code suggestion in IDEs", link: "https://github.com/features/copilot" },
        { name: "Codeium", purpose: "Free AI coding assistant", link: "https://codeium.com" },
        { name: "Replit Ghostwriter", purpose: "Code assistant in Replit IDE", link: "https://replit.com" },
        { name: "Tabnine", purpose: "AI auto-completion in coding", link: "https://www.tabnine.com" },
        { name: "AskCodi", purpose: "Coding help and snippet generation", link: "https://www.askcodi.com" },
        { name: "Amazon CodeWhisperer", purpose: "AI coding companion by AWS", link: "https://aws.amazon.com/codewhisperer" },
        { name: "Cursor", purpose: "AI-first code editor", link: "https://cursor.so" },
        { name: "Blackbox AI", purpose: "Code search and generation", link: "https://blackbox.ai" }
      ]
    },
    voice: {
      title: "🎤 Voice, Speech & Translation Tools",
      icon: <Mic className="w-5 h-5" />,
      tools: [
        { name: "Whisper by OpenAI", purpose: "Speech-to-text model (API, local)", link: "https://openai.com/research/whisper" },
        { name: "Voicemod AI", purpose: "Voice changer and effects", link: "https://www.voicemod.net" },
        { name: "ElevenLabs", purpose: "Ultra-realistic text-to-speech voices", link: "https://elevenlabs.io" },
        { name: "Descript", purpose: "Audio editing, podcasting with AI", link: "https://www.descript.com" },
        { name: "Veed.io", purpose: "Video subtitles and AI editing", link: "https://www.veed.io" },
        { name: "Murf AI", purpose: "AI voice generator for videos", link: "https://murf.ai" },
        { name: "Speechify", purpose: "Text-to-speech reading assistant", link: "https://speechify.com" },
        { name: "Otter.ai", purpose: "AI meeting transcription", link: "https://otter.ai" }
      ]
    },
    productivity: {
      title: "📊 Productivity Tools",
      icon: <BarChart className="w-5 h-5" />,
      tools: [
        { name: "Notion AI", purpose: "Notes, project management, task planner", link: "https://notion.so" },
        { name: "Taskade AI", purpose: "Brainstorming + task lists", link: "https://www.taskade.com" },
        { name: "Mem AI", purpose: "Smart notetaking with context", link: "https://mem.ai" },
        { name: "Obsidian AI", purpose: "Knowledge management with AI", link: "https://obsidian.md" },
        { name: "Todoist AI", purpose: "Smart task management", link: "https://todoist.com" },
        { name: "Motion", purpose: "AI-powered calendar and task planner", link: "https://usemotion.com" },
        { name: "Reclaim AI", purpose: "AI scheduling assistant", link: "https://reclaim.ai" }
      ]
    },
    documents: {
      title: "📑 AI PDF & Document Tools",
      icon: <FileText className="w-5 h-5" />,
      tools: [
        { name: "ChatPDF", purpose: "Ask questions from any PDF", link: "https://www.chatpdf.com" },
        { name: "Humata.ai", purpose: "Upload PDF and chat with it", link: "https://www.humata.ai" },
        { name: "PDFgear AI", purpose: "Edit, summarize, chat with PDF", link: "https://www.pdfgear.com" },
        { name: "DocuAsk", purpose: "AI document analysis and Q&A", link: "https://docuask.com" },
        { name: "Sharly AI", purpose: "Chat with documents and PDFs", link: "https://sharly.ai" },
        { name: "AskYourPDF", purpose: "Interactive PDF conversations", link: "https://askyourpdf.com" }
      ]
    }
  };

  const filteredTools = Object.entries(aiTools).reduce((acc, [key, category]) => {
    const filteredCategoryTools = category.tools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredCategoryTools.length > 0) {
      acc[key] = { ...category, tools: filteredCategoryTools };
    }
    
    return acc;
  }, {});

  const ToolTable = ({ tools, categoryId }) => {
    const isExpanded = expandedCategories[categoryId];
    const displayTools = isExpanded ? tools : tools.slice(0, 3);

    return (
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/50 backdrop-blur-sm">
                <th className="border border-purple-200 px-3 py-2 text-left text-sm font-semibold text-gray-700">Tool Name</th>
                <th className="border border-purple-200 px-3 py-2 text-left text-sm font-semibold text-gray-700">Purpose</th>
                <th className="border border-purple-200 px-3 py-2 text-center text-sm font-semibold text-gray-700 w-16">Link</th>
              </tr>
            </thead>
            <tbody>
              {displayTools.map((tool, index) => (
                <tr key={index} className="hover:bg-white/30 transition-colors duration-200">
                  <td className="border border-purple-200 px-3 py-3 text-sm font-medium text-gray-800">
                    {tool.name}
                  </td>
                  <td className="border border-purple-200 px-3 py-3 text-sm text-gray-600 leading-relaxed">
                    {tool.purpose}
                  </td>
                  <td className="border border-purple-200 px-3 py-3 text-center">
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-110"
                      title={`Visit ${tool.name}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {tools.length > 3 && (
          <div className="mt-3 flex justify-center">
            <button
              onClick={() => toggleCategory(categoryId)}
              className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-purple-700 hover:bg-white/80 transition-all duration-200 border border-purple-200"
            >
              {isExpanded ? (
                <>
                  <Minus size={16} />
                  Show Less
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Show {tools.length - 3} More
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, rgb(243, 231, 255) 0%, rgb(224, 242, 254) 50%, rgb(252, 228, 236) 100%)' }} className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🤖 AI Learning Hub
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            Discover the most powerful AI tools for learning, productivity, content creation, and more. 
            Your complete guide to AI-powered success.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-purple-200 rounded-xl leading-5 bg-white/70 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {Object.entries(filteredTools).map(([categoryId, category]) => (
            <div key={categoryId} className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {category.title}
                </h2>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                  {category.tools.length} tools
                </span>
              </div>
              
              <ToolTable tools={category.tools} categoryId={categoryId} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {Object.keys(filteredTools).length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No tools found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}

        {/* Bonus Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🛠️ BONUS: AI Tool Aggregators
          </h3>
          <p className="text-gray-600 mb-6 text-center">
            Discover even more AI tools with these comprehensive directories
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Futurepedia", desc: "1000+ categorized AI tools", link: "https://www.futurepedia.io" },
              { name: "There's An AI For That", desc: "Search AI tools by use case", link: "https://www.theresanaiforthat.com" },
              { name: "Toolify.ai", desc: "Curated AI tools and daily updates", link: "https://www.toolify.ai" }
            ].map((tool, index) => (
              <a
                key={index}
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/60 backdrop-blur-sm rounded-xl p-4 hover:bg-white/80 transition-all duration-200 border border-purple-200 group"
              >
                <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {tool.name}
                </h4>
                <p className="text-sm text-gray-600">{tool.desc}</p>
                <div className="mt-3 flex justify-end">
                  <ExternalLink size={16} className="text-purple-500 group-hover:text-purple-600" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            💡 Most tools offer free tiers or trials. Explore and find what works best for your needs!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AILearningHub;
