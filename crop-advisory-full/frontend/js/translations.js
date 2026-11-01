// ============================================
// CROP ADVISORY SYSTEM — TRANSLATIONS
// Supports: English, Hindi, Marathi
// ============================================

const TRANSLATIONS = {
  en: {
    // App titles
    appTitle: "Crop Advisory System",
    appSubtitle: "Best for Small & Marginal Farmers",
    
    // Steps
    steps: ["Input", "Weather", "Analysis", "AI", "Report", "Action", "Feedback"],
    
    // Step 1 — Farmer Input
    step1Title: "Farmer Inputs Data",
    step1Desc: "Enter your farm details to get personalized advice",
    farmerName: "Farmer Name",
    farmerNamePlaceholder: "Enter your name",
    location: "Location / Village",
    locationPlaceholder: "Enter your village or district",
    soilType: "Soil Type",
    soilTypes: ["Black Soil (Regur)", "Red Soil", "Sandy Loam", "Clay Soil", "Alluvial Soil"],
    landSize: "Land Size (in acres)",
    landSizePlaceholder: "e.g. 2.5",
    currentCrop: "Current / Planned Crop",
    currentCropPlaceholder: "e.g. Wheat, Rice, Cotton",
    uploadCrop: "Upload Crop / Soil Photos",
    uploadHint: "Tap to upload photos of your crops or soil",
    nextBtn: "Next →",
    
    // Step 2 — Weather
    step2Title: "Weather Data Fetch",
    step2Desc: "Fetching real-time weather for your location...",
    temperature: "Temperature",
    rainfall: "Rainfall",
    humidity: "Humidity",
    weatherFetched: "✅ Weather data loaded successfully",
    
    // Step 3 — Soil & Crop Analysis
    step3Title: "Soil & Crop Analysis",
    step3Desc: "Analyzing your soil conditions and crop images...",
    soilAnalysis: "Soil Analysis",
    cropAnalysis: "Crop Image Analysis",
    soilHealthLabel: "Soil Health",
    soilPH: "Estimated pH",
    nitrogenLevel: "Nitrogen Level",
    analysisComplete: "✅ Analysis complete — sending to AI engine",
    
    // Step 4 — AI Decision
    step4Title: "AI / Decision Processing",
    step4Desc: "Our AI is generating personalized recommendations...",
    aiProcessing: "AI Processing...",
    cropRecoTitle: "Crop Recommendation",
    fertiliserTitle: "Fertilizer Suggestion",
    pestTitle: "Pest & Disease Detection",
    irrigationTitle: "Irrigation Advice",
    
    // Step 5 — Report
    step5Title: "Generate Advisory Report",
    step5Desc: "Your personalized crop advisory report is ready",
    reportReady: "Advisory Report Ready",
    reportFor: "Report for",
    deliverVia: "Deliver via",
    downloadPDF: "Download PDF Report",
    sendSMS: "Send via SMS",
    
    // Step 6 — Farmer Action
    step6Title: "Farmer Takes Action",
    step6Desc: "Follow the advisory and take action on your farm",
    actionChecklist: "Action Checklist",
    actions: [
      "Prepare soil as recommended",
      "Apply fertilizer per schedule",
      "Monitor for pests weekly",
      "Follow irrigation advice",
    ],
    markDone: "Mark as Done",
    allDone: "All actions completed! 🎉",
    
    // Step 7 — Feedback
    step7Title: "Feedback / Update Data",
    step7Desc: "Help us improve by sharing your experience",
    rateAdvice: "Rate the advisory",
    feedbackPlaceholder: "Share your experience or observations...",
    submitFeedback: "Submit Feedback",
    thankYou: "Thank you for your feedback!",
    startOver: "Start New Advisory",
    
    // Common
    back: "← Back",
    next: "Next →",
    loading: "Loading...",
    analyzing: "Analyzing...",
    processing: "Processing...",
    
    // Crops list
    crops: ["Wheat", "Rice/Paddy", "Cotton", "Soybean", "Sugarcane", "Jowar", "Bajra", "Tur Dal", "Onion", "Tomato", "Maize"],
  },

  hi: {
    appTitle: "फसल सलाहकार प्रणाली",
    appSubtitle: "लघु और सीमांत किसानों के लिए सर्वोत्तम",
    
    steps: ["इनपुट", "मौसम", "विश्लेषण", "AI", "रिपोर्ट", "कार्रवाई", "प्रतिक्रिया"],
    
    step1Title: "किसान डेटा दर्ज करता है",
    step1Desc: "व्यक्तिगत सलाह पाने के लिए अपनी खेत की जानकारी दर्ज करें",
    farmerName: "किसान का नाम",
    farmerNamePlaceholder: "अपना नाम दर्ज करें",
    location: "स्थान / गाँव",
    locationPlaceholder: "अपना गाँव या जिला दर्ज करें",
    soilType: "मिट्टी का प्रकार",
    soilTypes: ["काली मिट्टी (रेगुर)", "लाल मिट्टी", "बलुई दोमट", "चिकनी मिट्टी", "जलोढ़ मिट्टी"],
    landSize: "भूमि का आकार (एकड़ में)",
    landSizePlaceholder: "जैसे 2.5",
    currentCrop: "वर्तमान / नियोजित फसल",
    currentCropPlaceholder: "जैसे गेहूं, चावल, कपास",
    uploadCrop: "फसल / मिट्टी की तस्वीरें अपलोड करें",
    uploadHint: "अपनी फसल या मिट्टी की तस्वीरें अपलोड करने के लिए टैप करें",
    nextBtn: "आगे →",
    
    step2Title: "मौसम डेटा प्राप्त करें",
    step2Desc: "आपके स्थान के लिए रियल-टाइम मौसम डेटा लाया जा रहा है...",
    temperature: "तापमान",
    rainfall: "वर्षा",
    humidity: "आर्द्रता",
    weatherFetched: "✅ मौसम डेटा सफलतापूर्वक लोड हुआ",
    
    step3Title: "मिट्टी और फसल विश्लेषण",
    step3Desc: "आपकी मिट्टी की स्थिति और फसल छवियों का विश्लेषण हो रहा है...",
    soilAnalysis: "मिट्टी विश्लेषण",
    cropAnalysis: "फसल छवि विश्लेषण",
    soilHealthLabel: "मिट्टी का स्वास्थ्य",
    soilPH: "अनुमानित pH",
    nitrogenLevel: "नाइट्रोजन स्तर",
    analysisComplete: "✅ विश्लेषण पूर्ण — AI इंजन को भेजा जा रहा है",
    
    step4Title: "कृत्रिम बुद्धिमत्ता / निर्णय प्रसंस्करण",
    step4Desc: "हमारी AI व्यक्तिगत सिफारिशें तैयार कर रही है...",
    aiProcessing: "AI प्रसंस्करण...",
    cropRecoTitle: "फसल की सिफारिश",
    fertiliserTitle: "उर्वरक सुझाव",
    pestTitle: "कीट और रोग का पता लगाना",
    irrigationTitle: "सिंचाई सलाह",
    
    step5Title: "सलाहकार रिपोर्ट उत्पन्न करें",
    step5Desc: "आपकी व्यक्तिगत फसल सलाहकार रिपोर्ट तैयार है",
    reportReady: "सलाहकार रिपोर्ट तैयार",
    reportFor: "रिपोर्ट के लिए",
    deliverVia: "के माध्यम से भेजें",
    downloadPDF: "PDF रिपोर्ट डाउनलोड करें",
    sendSMS: "SMS के माध्यम से भेजें",
    
    step6Title: "किसान कार्रवाई करता है",
    step6Desc: "सलाह का पालन करें और अपने खेत में कार्रवाई करें",
    actionChecklist: "कार्य सूची",
    actions: [
      "अनुशंसित अनुसार मिट्टी तैयार करें",
      "समय सारणी के अनुसार उर्वरक डालें",
      "साप्ताहिक कीटों की निगरानी करें",
      "सिंचाई सलाह का पालन करें",
    ],
    markDone: "पूर्ण चिह्नित करें",
    allDone: "सभी कार्य पूर्ण! 🎉",
    
    step7Title: "प्रतिक्रिया / डेटा अपडेट करें",
    step7Desc: "अपना अनुभव साझा करके हमें बेहतर बनाने में मदद करें",
    rateAdvice: "सलाह को रेट करें",
    feedbackPlaceholder: "अपना अनुभव या अवलोकन साझा करें...",
    submitFeedback: "प्रतिक्रिया सबमिट करें",
    thankYou: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
    startOver: "नई सलाह शुरू करें",
    
    back: "← वापस",
    next: "आगे →",
    loading: "लोड हो रहा है...",
    analyzing: "विश्लेषण हो रहा है...",
    processing: "प्रसंस्करण हो रहा है...",
    
    crops: ["गेहूं", "चावल/धान", "कपास", "सोयाबीन", "गन्ना", "ज्वार", "बाजरा", "तुर दाल", "प्याज", "टमाटर", "मक्का"],
  },

  mr: {
    appTitle: "पीक सल्लागार प्रणाली",
    appSubtitle: "अल्प आणि अत्यल्प शेतकऱ्यांसाठी सर्वोत्तम",
    
    steps: ["इनपुट", "हवामान", "विश्लेषण", "AI", "अहवाल", "कृती", "अभिप्राय"],
    
    step1Title: "शेतकरी डेटा भरतो",
    step1Desc: "वैयक्तिक सल्ला मिळवण्यासाठी आपल्या शेताची माहिती भरा",
    farmerName: "शेतकऱ्याचे नाव",
    farmerNamePlaceholder: "आपले नाव प्रविष्ट करा",
    location: "स्थान / गाव",
    locationPlaceholder: "आपले गाव किंवा जिल्हा प्रविष्ट करा",
    soilType: "जमिनीचा प्रकार",
    soilTypes: ["काळी माती (रेगुर)", "लाल माती", "वालुकामय चिकणमाती", "चिकट माती", "गाळाची माती"],
    landSize: "जमिनीचा आकार (एकरात)",
    landSizePlaceholder: "उदा. 2.5",
    currentCrop: "सध्याचे / नियोजित पीक",
    currentCropPlaceholder: "उदा. गहू, तांदूळ, कापूस",
    uploadCrop: "पिकाची / जमिनीची छायाचित्रे अपलोड करा",
    uploadHint: "आपल्या पिकाची किंवा जमिनीची छायाचित्रे अपलोड करण्यासाठी टॅप करा",
    nextBtn: "पुढे →",
    
    step2Title: "हवामान डेटा प्राप्त करा",
    step2Desc: "आपल्या स्थानासाठी रिअल-टाइम हवामान डेटा आणला जात आहे...",
    temperature: "तापमान",
    rainfall: "पाऊस",
    humidity: "आर्द्रता",
    weatherFetched: "✅ हवामान डेटा यशस्वीरित्या लोड झाला",
    
    step3Title: "जमीन आणि पीक विश्लेषण",
    step3Desc: "आपल्या जमिनीची स्थिती आणि पिकाच्या छायाचित्रांचे विश्लेषण होत आहे...",
    soilAnalysis: "जमीन विश्लेषण",
    cropAnalysis: "पीक छायाचित्र विश्लेषण",
    soilHealthLabel: "जमिनीचे आरोग्य",
    soilPH: "अंदाजित pH",
    nitrogenLevel: "नायट्रोजन पातळी",
    analysisComplete: "✅ विश्लेषण पूर्ण — AI इंजिनला पाठवले जात आहे",
    
    step4Title: "कृत्रिम बुद्धिमत्ता / निर्णय प्रक्रिया",
    step4Desc: "आमची AI वैयक्तिक शिफारशी तयार करत आहे...",
    aiProcessing: "AI प्रक्रिया...",
    cropRecoTitle: "पीक शिफारस",
    fertiliserTitle: "खत सूचना",
    pestTitle: "कीड आणि रोग शोध",
    irrigationTitle: "सिंचन सल्ला",
    
    step5Title: "सल्लागार अहवाल तयार करा",
    step5Desc: "आपला वैयक्तिक पीक सल्लागार अहवाल तयार आहे",
    reportReady: "सल्लागार अहवाल तयार",
    reportFor: "अहवाल साठी",
    deliverVia: "द्वारे पाठवा",
    downloadPDF: "PDF अहवाल डाउनलोड करा",
    sendSMS: "SMS द्वारे पाठवा",
    
    step6Title: "शेतकरी कृती करतो",
    step6Desc: "सल्ला पाळा आणि आपल्या शेतात कृती करा",
    actionChecklist: "कृती यादी",
    actions: [
      "शिफारसीनुसार जमीन तयार करा",
      "वेळापत्रकानुसार खत द्या",
      "साप्ताहिक कीडांचे निरीक्षण करा",
      "सिंचन सल्ला पाळा",
    ],
    markDone: "पूर्ण म्हणून चिन्हांकित करा",
    allDone: "सर्व कृती पूर्ण! 🎉",
    
    step7Title: "अभिप्राय / डेटा अपडेट करा",
    step7Desc: "आपला अनुभव शेअर करून आम्हाला सुधारण्यास मदत करा",
    rateAdvice: "सल्ल्याला रेटिंग द्या",
    feedbackPlaceholder: "आपला अनुभव किंवा निरीक्षणे शेअर करा...",
    submitFeedback: "अभिप्राय सबमिट करा",
    thankYou: "आपल्या अभिप्रायाबद्दल धन्यवाद!",
    startOver: "नवीन सल्ला सुरू करा",
    
    back: "← मागे",
    next: "पुढे →",
    loading: "लोड होत आहे...",
    analyzing: "विश्लेषण होत आहे...",
    processing: "प्रक्रिया होत आहे...",
    
    crops: ["गहू", "तांदूळ/भात", "कापूस", "सोयाबीन", "ऊस", "ज्वारी", "बाजरी", "तूर डाळ", "कांदा", "टोमॅटो", "मका"],
  }
};

// AI-generated recommendations based on inputs (simulated)
const CROP_RECOMMENDATIONS = {
  "Black Soil (Regur)": { crop: "Cotton / Soybean", reason: "Black soil retains moisture well — ideal for cotton and soybean." },
  "काली मिट्टी (रेगुर)": { crop: "कपास / सोयाबीन", reason: "काली मिट्टी नमी बनाए रखती है — कपास और सोयाबीन के लिए आदर्श।" },
  "काळी माती (रेगुर)": { crop: "कापूस / सोयाबीन", reason: "काळी माती ओलावा टिकवते — कापूस आणि सोयाबीनसाठी आदर्श." },
  
  "Red Soil": { crop: "Groundnut / Millets", reason: "Red soil suits drought-tolerant crops like groundnut and millets." },
  "लाल मिट्टी": { crop: "मूंगफली / बाजरा", reason: "लाल मिट्टी सूखा-सहिष्णु फसलों के लिए उपयुक्त है।" },
  "लाल माती": { crop: "भुईमूग / बाजरी", reason: "लाल माती दुष्काळ-सहनशील पिकांसाठी योग्य आहे." },
  
  "default": { crop: "Wheat / Maize", reason: "Versatile crops suitable for your soil and climate conditions." },
};

function getT() {
  const lang = localStorage.getItem('cropLang') || 'en';
  return TRANSLATIONS[lang] || TRANSLATIONS['en'];
}

function getLang() {
  return localStorage.getItem('cropLang') || 'en';
}

function getCropReco(soilType) {
  return CROP_RECOMMENDATIONS[soilType] || CROP_RECOMMENDATIONS["default"];
}
