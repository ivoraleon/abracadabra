const rootStyles = window.getComputedStyle(document.documentElement)

if (rootStyles.getPropertyValue('--house-image-width-large') != null && rootStyles.getPropertyValue('--house-image-width-large') !== '') {
    ready()
} else {
    document.getElementById('main-css').addEventListener('load', ready)
}

function ready() {
    const imageWidth = parseFloat(rootStyles.getPropertyValue('--house-image-width-large'))
    const imageAspectRatio = parseFloat(rootStyles.getPropertyValue('--house-image-aspect-ratio'))
    const imageHeight = imageWidth / imageAspectRatio
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    )

    FilePond.setOptions({
        stylePanelAspectRatio: 1 / imageAspectRatio,
        imageResizeTargetWidth: imageWidth,
        imageResizeTargetHeight: imageHeight
    })

    FilePond.parse(document.body)
}