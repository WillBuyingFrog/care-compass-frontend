import {Box, Flex, Link, Spacer, Text} from "@chakra-ui/react";

function queryRecommendPapers(subject){
    let ret = []
    if (subject === 'ComputerVision') {
        ret = [
            {
                id: 'cv-paper-1',
                title: 'SurfaceNet: An End-to-End 3D Neural Network for Multiview Stereopsis',
                citations: 1000,
                venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition'
            },
            {
                id: 'cv-paper-2',
                title: 'SurfaceNet: An End-to-End 3D Neural Network for Multiview Stereopsis',
                citations: 1000,
                venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition'
            },
            {
                id: 'cv-paper-3',
                title: 'SurfaceNet: An End-to-End 3D Neural Network for Multiview Stereopsis',
                citations: 1000,
                venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition'
            },
            {
                id: 'cv-paper-4',
                title: 'SurfaceNet: An End-to-End 3D Neural Network for Multiview Stereopsis',
                citations: 1000,
                venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition'
            },
            {
                id: 'cv-paper-5',
                title: 'SurfaceNet: An End-to-End 3D Neural Network for Multiview Stereopsis',
                citations: 1000,
                venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition'
            }
        ]
    }
    return ret;
}

function getDisplaySubjectName(subject){
    let dict = {
        ComputerVision: '计算机视觉'
    }

    return dict[subject]
}

function RecommendPapersCard({subject}){

    const result = queryRecommendPapers(subject)

    const displaySubjectName = getDisplaySubjectName(subject)

    const layout_result = result.map(entry => {

        let displayPaperName = entry.title
        let displayVenueName = entry.venue

        if (displayVenueName.length >= 42) {
            displayVenueName = displayVenueName.substring(0, 42) + "..."
        }
        if (displayPaperName.length >= 33) {
            displayPaperName = displayPaperName.substring(0, 33) + "..."
        }

        return (
            <Box
                key={entry.key}

                height={'19%'}
            >
                <Text fontSize='15px'>{displayPaperName}</Text>
                <Text fontSize='11px' color='grey'>{displayVenueName}</Text>
            </Box>
            )
    })

    return (
        <Box
            backgroundColor='white'
            borderRadius='3px'
            boxShadow='md'

            height='350px'
            width='20vw'
            padding='15px 15px 20px 20px'
        >
            <Box
                height={'15%'}
            >
                <Text fontSize='20px'>{displaySubjectName} 热门论文</Text>
            </Box>
            <Box
                height={'85%'}
            >
                {layout_result}
            </Box>
        </Box>
    )
}

export default RecommendPapersCard;
