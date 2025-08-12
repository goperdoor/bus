import React, { useState } from 'react';
import AdSenseAuto from '../ads/AdSenseAuto';

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
      tools: [
        { name: "Socratic by Google", purpose: "Solve questions using camera & explanations", link: "https://socratic.org" },
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
      <div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }}>
                <th style={{
                  border: '1px solid rgba(147, 51, 234, 0.2)',
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151'
                }}>Tool Name</th>
                <th style={{
                  border: '1px solid rgba(147, 51, 234, 0.2)',
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151'
                }}>Purpose</th>
                <th style={{
                  border: '1px solid rgba(147, 51, 234, 0.2)',
                  padding: '12px 16px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  width: '80px'
                }}>Link</th>
              </tr>
            </thead>
            <tbody>
              {displayTools.map((tool, index) => (
                <tr key={index} style={{
                  borderBottom: index !== displayTools.length - 1 ? '1px solid rgba(147, 51, 234, 0.1)' : 'none'
                }}>
                  <td style={{
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1f2937',
                    minWidth: '140px'
                  }}>
                    {tool.name}
                  </td>
                  <td style={{
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    padding: '16px',
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.5'
                  }}>
                    {tool.purpose}
                  </td>
                  <td style={{
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    padding: '16px',
                    textAlign: 'center'
                  }}>
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                        color: 'white',
                        borderRadius: '50%',
                        textDecoration: 'none',
                        fontSize: '16px',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.background = 'linear-gradient(45deg, #7c3aed, #db2777)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.background = 'linear-gradient(45deg, #8b5cf6, #ec4899)';
                      }}
                      title={`Visit ${tool.name}`}
                    >
                      ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {tools.length > 3 && (
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button
              onClick={() => toggleCategory(categoryId)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#7c3aed',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {isExpanded ? '− Show Less' : `+ Show ${tools.length - 3} More`}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, rgb(243, 231, 255) 0%, rgb(224, 242, 254) 50%, rgb(252, 228, 236) 100%)',
      minHeight: '100vh',
      padding: '144px 16px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: window.innerWidth <= 768 ? '28px' : '36px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            🤖 AI Learning Hub
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#4b5563',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px',
            lineHeight: '1.6'
          }}>
            Discover the most powerful AI tools for learning, productivity, content creation, and more. 
            Your complete guide to AI-powered success.
          </p>
          
          {/* Search Bar */}
          <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto 32px' }}>
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 50px',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '25px',
                fontSize: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                e.target.style.borderColor = 'rgba(147, 51, 234, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <span style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '18px',
              color: '#9ca3af'
            }}>🔍</span>
          </div>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {Object.entries(filteredTools).map(([categoryId, category]) => (
            <div key={categoryId} style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '20px',
              padding: window.innerWidth <= 768 ? '20px' : '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginBottom: '24px',
                flexWrap: 'wrap'
              }}>
                <h2 style={{
                  fontSize: window.innerWidth <= 768 ? '20px' : '24px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: '0'
                }}>
                  {category.title}
                </h2>
                <span style={{
                  backgroundColor: 'rgba(147, 51, 234, 0.1)',
                  color: '#7c3aed',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {category.tools.length} tools
                </span>
              </div>
              
              <ToolTable tools={category.tools} categoryId={categoryId} />
            </div>

          ))}
<AdSenseAuto />
        </div>

        {/* No Results */}
        {Object.keys(filteredTools).length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              No tools found
            </h3>
            <p style={{ color: '#6b7280' }}>Try adjusting your search terms</p>
          </div>
        )}

        {/* Bonus Section */}
        <div style={{
          marginTop: '48px',
          background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
          borderRadius: '20px',
          padding: '32px',
          border: '1px solid rgba(147, 51, 234, 0.2)'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            🛠️ BONUS: AI Tool Aggregators
          </h3>
          <p style={{
            color: '#4b5563',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Discover even more AI tools with these comprehensive directories
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
            gap: '16px'
          }}>
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
                style={{
                  display: 'block',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '16px',
                  padding: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(147, 51, 234, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <h4 style={{
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  {tool.name}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  margin: '0 0 12px 0'
                }}>{tool.desc}</p>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#8b5cf6', fontSize: '16px' }}>↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            💡 Most tools offer free tiers or trials. Explore and find what works best for your needs!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AILearningHub;
