# 🪪 AI Identity Document Extractor & Biometric Inspection Suite

[![Live Interactive Demo](https://img.shields.io/badge/Live%20Demo-Web%20Inspection%20Studio-brightgreen?style=for-the-badge&logo=google-chrome)](https://pradeepdeivamani.github.io/FullStack--ID-Extractor/)
[![Computer Vision](https://img.shields.io/badge/CV-YOLOv8%20%7C%20OpenCV-00FFFF?style=for-the-badge&logo=opencv)](https://github.com/PradeepDEIVAMANI/FullStack--ID-Extractor)
[![OCR](https://img.shields.io/badge/OCR-Tesseract%20%2F%20MRZ%20Parser-blueviolet?style=for-the-badge)](https://github.com/PradeepDEIVAMANI/FullStack--ID-Extractor)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%26%20Interactive%20Canvas-61DAFB?style=for-the-badge&logo=react)](https://github.com/PradeepDEIVAMANI/FullStack--ID-Extractor)

An end-to-end computer vision and identity document extraction pipeline. Automatically detects, segments, and parses critical personal attributes and biometric portraits from national ID cards, international passports, and driver's licenses using **YOLOv8, OpenCV, and Optical Character Recognition (OCR)**.

---

## 🚀 Live Interactive Demo

Test document segmentation, neural bounding boxes, biometric face extraction, and structured KYC parsing live in your browser:
👉 **[https://pradeepdeivamani.github.io/FullStack--ID-Extractor/](https://pradeepdeivamani.github.io/FullStack--ID-Extractor/)**

### 💡 Features You Can Test in the Simulator:
- **Multi-Document Format Support:** 1-click test presets for **EU National ID Cards**, **Passports (ICAO Doc 9303 TD3 format)**, and **Driver's Licenses**, or upload your own document.
- **YOLOv8 Neural Bounding Boxes:** Visual bounding box overlays classifying biometric portraits, names, dates of birth, document numbers, and MRZ zones.
- **Biometric Face Isolation:** Dedicated facial portrait cropping and visual validation.
- **MRZ & Checksum Parsing:** Validates Machine Readable Zone checksum algorithms and parses structured entities.
- **Export & Verification:** 1-click JSON export of parsed KYC identity profiles.

---

## 🏛️ System Architecture

```
[ ID Card / Passport Image ]
             │
             ▼
┌─────────────────────────┐
│   OpenCV Pre-Processing │  Perspective correction, deskewing, homography, contrast & lighting normalization.
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ YOLOv8 Neural Inference │  Multi-class object detection identifying text ROIs, MRZ lines, and biometric face.
└────────────┬────────────┘
             │
             ├──────────────────────────┐
             ▼                          ▼
┌─────────────────────────┐ ┌─────────────────────────┐
│     OCR Text Engine     │ │  Biometric Face Crop    │
│  (Tokenization & MRZ)   │ │  (Anti-Spoofing & KYC)  │
└────────────┬────────────┘ └───────────┬─────────────┘
             │                          │
             └───────────┬──────────────┘
                         ▼
┌─────────────────────────────────────────────────────┐
│  Structured Verified KYC Profile (JSON / React UI)  │
└─────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack

- **Computer Vision & AI Backend:** Python 3.10+, YOLOv8 (`ultralytics`), OpenCV (`cv2`), Tesseract OCR, NumPy, FastAPI.
- **Interactive Web Interface:** React, HTML5 Canvas, Cropper.js, Modern Glassmorphism UI, Web Audio synth cues.
- **Deployment:** GitHub Pages & Git CI/CD.
