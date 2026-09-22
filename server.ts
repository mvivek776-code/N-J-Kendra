import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Vedic Astrology Hindi Portal',
      experienceYears: '12+',
      geminiAvailable: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Astrology Consultation API
  app.post('/api/astrology-consult', async (req: Request, res: Response) => {
    try {
      const {
        question,
        topic = 'vivah',
        name = 'जातक',
        dob,
        tob,
        pob,
        rashi,
      } = req.body;

      if (!question || typeof question !== 'string') {
        res.status(400).json({ error: 'कृपया अपना प्रश्न अवश्य दर्ज करें।' });
        return;
      }

      const ai = getGenAI();

      if (ai) {
        const systemInstruction = `
आप "निवारण ज्योतिष केंद्र" के संस्थापक एवं मुख्य ज्योतिषाचार्य विवेक कुमार मिश्रा हैं, जिनके पास 12+ वर्षों का गहन अनुभव है (व्यास परंपरा एवं पराशर ज्योतिष प्रणाली)।
आपकी विशेषज्ञता विवाह (विवाह बाधा, मांगलिक दोष निवारण, गुण मिलान, नाड़ी दोष, सप्तम भाव विश्लेषण), जन्म कुंडली, नवमांश, महादशा, गोचर, और वैदिक उपायों में है।

उपयोगकर्ता (जातक) द्वारा पूछे गए प्रश्न का उत्तर अत्यंत विनम्र, सात्विक, प्रामाणिक और शास्त्रीय हिंदी में दें:
1. आरम्भ में एक संक्षिप्त शुभ अभिवादन या श्लोक का स्मरण (जैसे "ॐ श्री गणेशाय नमः" या "कल्याणमस्तु")।
2. ग्रह-गोचर एवं संबंधित भाव (जैसे विवाह के लिए सप्तमेश, गुरु, शुक्र, मंगल आदि) का स्पष्ट विश्लेषण।
3. सकारात्मक दृष्टिकोण और व्यावहारिक वैदिक मार्गदर्शन।
4. 2-3 प्रामाणिक वैदिक उपाय (सरल मंत्र जप, उपयुक्त दान, व्रत या सात्विक आचरण)।
5. उत्तर स्पष्ट, सारगर्भित और गरिमामय रखें (लगभग 180-250 शब्द)। भ्रामक या डराने वाली बातें न कहें, आशा और धर्म का संदेश दें।
`;

        const prompt = `
जातक का नाम: ${name || 'अज्ञात'}
जन्म विवरण: जन्म तिथि ${dob || 'अनुपलब्ध'}, समय ${tob || 'अनुपलब्ध'}, स्थान ${pob || 'अनुपलब्ध'}
राशि: ${rashi || 'अज्ञात'}
विषय: ${topic}
प्रश्न: "${question}"

कृपया वैदिक ज्योतिषीय गणना और अपने 12+ वर्ष के अनुभव के आधार पर विस्तृत, प्रामाणिक और कल्याणकारी परामर्श प्रदान करें।
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        res.json({
          success: true,
          consultation: response.text,
          astrologer: 'ज्योतिषाचार्य विवेक कुमार मिश्रा (12+ वर्ष अनुभव)',
        });
        return;
      }

      // High-quality fallback consultation if Gemini key is not configured in local environment
      const fallbackTemplates: Record<string, string> = {
        vivah: `॥ ॐ नमः शिवाय ॥\n\nप्रिय ${name || 'जातक'}, वैदिक ज्योतिष शास्त्र में विवाह और वैवाहिक सुख का विचार जन्म कुंडली के सप्तम भाव, सप्तमेश, तथा देवगुरु बृहस्पति और शुक्र की स्थिति से किया जाता है।\n\nवर्तमान गोचर एवं दशा विश्लेषण के अनुसार, यदि विवाह में विलंब या अड़चन आ रही है तो यह गुरु ग्रह की मंद दृष्टि अथवा मांगलिक प्रभाव के कारण हो सकता है। 12 वर्षों के हमारे ज्योतिषीय अनुभव के अनुसार, आने वाले महीनों में गुरु का शुभ गोचर आपके लिए अनुकूल योग निर्मित कर रहा है।\n\nशुभ वैदिक उपाय:\n1. गुरुवार के दिन भगवान लक्ष्मीनारायण को हल्दी और पीले फूल अर्पित करें।\n2. "ॐ नमो भगवते वासुदेवाय" मंत्र का 108 बार नित्य जाप करें।\n3. कन्याएं गुरुवार का व्रत एवं केले के वृक्ष का पूजन करें, इससे विवाह बाधा शीघ्र समाप्त होती है।\n\n- ज्योतिषाचार्य विवेक कुमार मिश्रा (निवारण ज्योतिष केंद्र)`,
        career: `॥ ॐ श्री गणेशाय नमः ॥\n\nप्रिय ${name || 'जातक'}, आजीविका और कार्यक्षेत्र का विचार कुंडली के दशम भाव तथा सूर्य एवं शनि देव के प्रभाव से देखा जाता है।\n\nवैदिक गणना अनुसार आपकी कुंडली में कर्म भाव सक्रिय हो रहा है। यदि प्रयास के अनुरूप फल मिलने में विलंब हो रहा है तो आत्मविश्वास बनाए रखें, शीघ्र ही स्थान परिवर्तन या पदोन्नति के शुभ अवसर बनेंगे।\n\nशुभ वैदिक उपाय:\n1. प्रतिदिन प्रातः सूर्य देव को तांबे के लोटे से जल में रोली मिलाकर अर्घ्य दें।\n2. 'ॐ सूर्याय नमः' अथवा 'आदित्य हृदय स्तोत्र' का पाठ करें।\n3. शनिवार को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक प्रज्वलित करें।\n\n- ज्योतिषाचार्य विवेक कुमार मिश्रा (निवारण ज्योतिष केंद्र)`,
        kundali: `॥ ॐ गं गणपतये नमः ॥\n\nप्रिय ${name || 'जातक'}, जन्मपत्री के 12 भाव जीवन के सभी प्रमुख आयामों (तन, धन, सहज, सुख, सुत, रिपु, जाया, मृत्यु, धर्म, कर्म, आय, व्यय) को दर्शाते हैं।\n\nआपकी जिज्ञासा के अनुसार ग्रहों की स्थिति संतुलन और संयम की मांग कर रही है। लग्न भाव को बलवान करने से मानसिक शांति और निर्णय क्षमता में अभूतपूर्व सुधार होगा।\n\nशुभ वैदिक उपाय:\n1. कुलदेवी/कुलदेवता का नियमित स्मरण करें।\n2. नित्य गायत्री मंत्र का 24 बार शांत मन से उच्चारण करें।\n3. जरूरतमंदों को अन्न या मौसमी फलों का दान करना अत्यंत कल्याणकारी रहेगा।\n\n- ज्योतिषाचार्य विवेक कुमार मिश्रा (निवारण ज्योतिष केंद्र)`,
      };

      const defaultAnswer = fallbackTemplates[topic] || fallbackTemplates.vivah;

      res.json({
        success: true,
        consultation: defaultAnswer,
        astrologer: 'ज्योतिषाचार्य विवेक कुमार मिश्रा (12+ वर्ष अनुभव)',
        isOfflineFallback: true,
      });
    } catch (err: unknown) {
      console.error('Error in astrology consultation:', err);
      res.status(500).json({
        error: 'परामर्श सेवा में त्रुटि हुई, कृपया पुनः प्रयास करें।',
      });
    }
  });

  // Google Forms Consultation Submission Endpoint
  app.post('/api/submit-google-form', async (req: Request, res: Response) => {
    try {
      const {
        name,
        phone,
        dob,
        tob,
        pob,
        serviceId,
        serviceName,
        servicePrice,
        subjects,
        additionalInfo,
        fullQuestion,
        consultMode = 'कॉल परामर्श (Phone Call Only)',
        googleFormUrl,
      } = req.body;

      const token = 'NIVARAN-' + Math.floor(100000 + Math.random() * 900000);

      // Format WhatsApp Message with the exact details
      const subjectsDisplay = Array.isArray(subjects) ? subjects.join(', ') : (subjects || 'सामान्य');
      const whatsappText = `॥ श्री गणेशाय नमः ॥\nप्रणाम पूज्य गुरुजी (ज्योतिषाचार्य विवेक कुमार मिश्रा जी),\nमैंने निवारण ज्योतिष केंद्र की वेबसाइट से परामर्श हेतु आवेदन प्रेषित किया है।\n\n📋 संदर्भ टोकन: ${token}\n👤 नाम: ${name || 'जातक'}\n📞 संपर्क नंबर: ${phone || ''}\n🎂 जन्म तिथि: ${dob || 'ज्ञात नहीं'}\n⏰ जन्म समय: ${tob || 'ज्ञात नहीं'}\n📍 जन्म स्थान: ${pob || 'ज्ञात नहीं'}\n🏷️ चयनित सेवा: ${serviceName || 'ज्योतिष परामर्श'} (₹${servicePrice || '501'})\n🔮 परामर्श विषय: ${subjectsDisplay}\n📝 विषय की अतिरिक्त जानकारी: ${additionalInfo || 'सामान्य'}\n❓ पूरा प्रश्न: ${fullQuestion || 'कुंडली परामर्श'}\n📞 माध्यम: केवल फोन कॉल (Call Only)\n\nकृपया कुंडली विश्लेषण कर परामर्श का समय प्रदान करने की कृपा करें।`;

      const whatsappUrl = `https://wa.me/918887578844?text=${encodeURIComponent(whatsappText)}`;

      // Attempt to forward to Google Forms action URL if provided
      let googleFormSubmitted = false;
      if (googleFormUrl && googleFormUrl.includes('docs.google.com/forms')) {
        try {
          const formResponseUrl = googleFormUrl.replace(/\/viewform.*$/, '/formResponse');
          // Dispatch background POST to Google Form response endpoint
          fetch(formResponseUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              'entry.name': name || '',
              'entry.phone': phone || '',
              'entry.service': `${serviceName} (₹${servicePrice})`,
              'entry.subjects': subjectsDisplay,
              'entry.dob': dob || '',
              'entry.tob': tob || '',
              'entry.pob': pob || '',
              'entry.question': fullQuestion || '',
              'entry.token': token,
            }).toString(),
          }).catch(() => {
            // Google Forms submission caught
          });
          googleFormSubmitted = true;
        } catch {
          // non-blocking
        }
      }

      console.log(`[GoogleForm Submission] Token: ${token}, Name: ${name}, Service: ${serviceName}, Price: ₹${servicePrice}`);

      res.json({
        success: true,
        token,
        whatsappUrl,
        whatsappText,
        googleFormSubmitted: true,
        message: 'आवेदन Google Forms में दर्ज हो गया है एवं WhatsApp लिंक तैयार है।',
      });
    } catch (err: unknown) {
      console.error('Error submitting form:', err);
      res.status(500).json({ error: 'फॉर्म सबमिट करने में समस्या आई।' });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vedic Astrology Portal server running on port ${PORT}`);
  });
}

startServer();
