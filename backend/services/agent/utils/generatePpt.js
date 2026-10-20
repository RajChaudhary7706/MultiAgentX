import pptxgen from "pptxgenjs"

const COLORS = {
    ink: "14213D",
    inkLight: "243653",
    blue: "3478F6",
    cyan: "69D2E7",
    paper: "F5F7FB",
    white: "FFFFFF",
    text: "243247",
    muted: "68778D",
    border: "E3E9F2",
    cardBlue: "EAF1FF",
    cardMint: "E8F7F4",
    cardGold: "FFF4DF",
    cardLilac: "F2EDFF",
}

const CARD_TINTS = [
    COLORS.cardBlue,
    COLORS.cardMint,
    COLORS.cardGold,
    COLORS.cardLilac,
]

const addCover = (ppt, data) => {
    const slide = ppt.addSlide()
    slide.background = { color: COLORS.ink }

    slide.addShape(ppt.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 0.18,
        h: 7.5,
        line: { color: COLORS.cyan, transparency: 100 },
        fill: { color: COLORS.cyan },
    })
    slide.addShape(ppt.ShapeType.ellipse, {
        x: 9.15,
        y: -1.1,
        w: 5.1,
        h: 5.1,
        line: { color: COLORS.inkLight, transparency: 100 },
        fill: { color: COLORS.inkLight, transparency: 10 },
    })
    slide.addShape(ppt.ShapeType.ellipse, {
        x: 10.15,
        y: 4.55,
        w: 2.3,
        h: 2.3,
        line: { color: COLORS.blue, transparency: 100 },
        fill: { color: COLORS.blue, transparency: 18 },
    })

    slide.addText("MULTIAGENTX  /  INSIGHTS", {
        x: 0.9,
        y: 0.75,
        w: 5.6,
        h: 0.25,
        fontFace: "Aptos",
        fontSize: 10,
        charSpacing: 2.2,
        bold: true,
        color: COLORS.cyan,
        margin: 0,
    })
    slide.addShape(ppt.ShapeType.rect, {
        x: 0.9,
        y: 1.55,
        w: 0.72,
        h: 0.07,
        line: { color: COLORS.blue, transparency: 100 },
        fill: { color: COLORS.blue },
    })
    slide.addText(data.title || "Untitled Presentation", {
        x: 0.9,
        y: 1.9,
        w: 10.7,
        h: 1.65,
        fontFace: "Aptos Display",
        fontSize: 38,
        bold: true,
        color: COLORS.white,
        breakLine: false,
        fit: "shrink",
        valign: "mid",
        margin: 0,
    })
    if (data.subtitle) {
        slide.addText(data.subtitle, {
            x: 0.95,
            y: 3.8,
            w: 8.4,
            h: 0.85,
            fontFace: "Aptos",
            fontSize: 18,
            color: "C4D0E2",
            breakLine: false,
            fit: "shrink",
            valign: "top",
            margin: 0,
        })
    }
    slide.addText("A clear perspective on what matters", {
        x: 0.95,
        y: 6.55,
        w: 6.8,
        h: 0.25,
        fontFace: "Aptos",
        fontSize: 10,
        charSpacing: 0.7,
        color: "9DAEC5",
        margin: 0,
    })
}

const addContentSlide = (ppt, slideData, page, total) => {
    const slide = ppt.addSlide()
    slide.background = { color: COLORS.paper }

    slide.addShape(ppt.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 13.333,
        h: 0.11,
        line: { color: COLORS.blue, transparency: 100 },
        fill: { color: COLORS.blue },
    })
    slide.addText("KEY IDEAS", {
        x: 0.72,
        y: 0.52,
        w: 2.2,
        h: 0.22,
        fontFace: "Aptos",
        fontSize: 9,
        charSpacing: 2,
        bold: true,
        color: COLORS.blue,
        margin: 0,
    })
    slide.addText(slideData.title || `Section ${page}`, {
        x: 0.7,
        y: 0.86,
        w: 11.9,
        h: 0.65,
        fontFace: "Aptos Display",
        fontSize: 27,
        bold: true,
        color: COLORS.ink,
        fit: "shrink",
        margin: 0,
        valign: "mid",
    })

    const points = Array.isArray(slideData.points)
        ? slideData.points.filter((point) => typeof point === "string" && point.trim())
        : []
    const visiblePoints = points.slice(0, 6)
    const rows = Math.max(1, Math.ceil(visiblePoints.length / 2))
    const gapY = 0.2
    const availableHeight = 4.55
    const cardHeight = Math.min(1.3, (availableHeight - gapY * (rows - 1)) / rows)

    visiblePoints.forEach((point, index) => {
        const column = index % 2
        const row = Math.floor(index / 2)
        const x = column === 0 ? 0.72 : 6.82
        const y = 1.9 + row * (cardHeight + gapY)
        const tint = CARD_TINTS[index % CARD_TINTS.length]

        slide.addShape(ppt.ShapeType.roundRect, {
            x,
            y,
            w: 5.78,
            h: cardHeight,
            rectRadius: 0.12,
            line: { color: COLORS.border, width: 0.8 },
            fill: { color: COLORS.white },
            shadow: {
                type: "outer",
                color: "AAB5C5",
                blur: 1.5,
                angle: 45,
                distance: 1,
                opacity: 0.12,
            },
        })
        slide.addShape(ppt.ShapeType.ellipse, {
            x: x + 0.22,
            y: y + (cardHeight - 0.42) / 2,
            w: 0.42,
            h: 0.42,
            line: { color: tint, transparency: 100 },
            fill: { color: tint },
        })
        slide.addText(String(index + 1).padStart(2, "0"), {
            x: x + 0.22,
            y: y + (cardHeight - 0.42) / 2 + 0.11,
            w: 0.42,
            h: 0.17,
            fontFace: "Aptos",
            fontSize: 9,
            bold: true,
            align: "center",
            color: COLORS.ink,
            margin: 0,
        })
        slide.addText(point.trim(), {
            x: x + 0.82,
            y: y + 0.16,
            w: 4.7,
            h: cardHeight - 0.32,
            fontFace: "Aptos",
            fontSize: 16,
            color: COLORS.text,
            breakLine: false,
            fit: "shrink",
            valign: "mid",
            margin: 0,
            paraSpaceAfterPt: 0,
        })
    })

    slide.addShape(ppt.ShapeType.line, {
        x: 0.72,
        y: 6.78,
        w: 11.9,
        h: 0,
        line: { color: COLORS.border, width: 0.8 },
    })
    slide.addText("MULTIAGENTX", {
        x: 0.72,
        y: 6.98,
        w: 2.5,
        h: 0.18,
        fontFace: "Aptos",
        fontSize: 8,
        charSpacing: 1.5,
        bold: true,
        color: COLORS.muted,
        margin: 0,
    })
    slide.addText(`${String(page).padStart(2, "0")}  /  ${String(total).padStart(2, "0")}`, {
        x: 10.8,
        y: 6.96,
        w: 1.82,
        h: 0.2,
        fontFace: "Aptos",
        fontSize: 9,
        bold: true,
        align: "right",
        color: COLORS.muted,
        margin: 0,
    })
}

const addThankYou = (ppt) => {
    const slide = ppt.addSlide()
    slide.background = { color: COLORS.ink }

    slide.addShape(ppt.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 13.333,
        h: 0.11,
        line: { color: COLORS.cyan, transparency: 100 },
        fill: { color: COLORS.cyan },
    })
    slide.addText("THANK YOU", {
        x: 0.9,
        y: 2.35,
        w: 11.5,
        h: 0.35,
        fontFace: "Aptos",
        fontSize: 11,
        charSpacing: 3,
        bold: true,
        align: "center",
        color: COLORS.cyan,
        margin: 0,
    })
    slide.addText("Ideas worth\nmoving forward.", {
        x: 1.1,
        y: 2.95,
        w: 11.1,
        h: 1.55,
        fontFace: "Aptos Display",
        fontSize: 34,
        bold: true,
        align: "center",
        color: COLORS.white,
        breakLine: false,
        fit: "shrink",
        valign: "mid",
        margin: 0,
    })
    slide.addShape(ppt.ShapeType.rect, {
        x: 6.25,
        y: 4.8,
        w: 0.82,
        h: 0.06,
        line: { color: COLORS.blue, transparency: 100 },
        fill: { color: COLORS.blue },
    })
    slide.addText("MULTIAGENTX", {
        x: 0,
        y: 6.85,
        w: 13.333,
        h: 0.2,
        fontFace: "Aptos",
        fontSize: 9,
        charSpacing: 2,
        bold: true,
        align: "center",
        color: "9DAEC5",
        margin: 0,
    })
}

export const generatePpt = async (data) => {
    const ppt = new pptxgen()
    ppt.layout = "LAYOUT_WIDE"
    ppt.author = "MultiAgentX"
    ppt.title = data.title || "MultiAgentX Presentation"
    ppt.subject = data.title || "MultiAgentX Presentation"
    ppt.company = "MultiAgentX"
    ppt.lang = "en-US"
    ppt.theme = {
        headFontFace: "Aptos Display",
        bodyFontFace: "Aptos",
        lang: "en-US",
    }

    const slides = Array.isArray(data.slides) ? data.slides : []

    addCover(ppt, data)
    slides.forEach((slide, index) => {
        addContentSlide(ppt, slide, index + 1, slides.length)
    })
    addThankYou(ppt)

    return ppt
}
