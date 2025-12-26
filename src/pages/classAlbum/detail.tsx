import styled from "styled-components"
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAlbumDetail, getImageUrl } from "../../apis/classAlbum";
import { AlbumImage } from "../../apis/classAlbum/type";

export const ClassAlbumDetail = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [images, setImages] = useState<AlbumImage[]>([]);
    const title = (location.state as { title?: string })?.title || `앨범 #${id}`;

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const res = await getAlbumDetail(id);
                setImages(res.data);
            } catch (error) {
                console.error('클래스 앨범 상세 조회 에러: ', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            <Wrapper>
                <p>{title}</p>
                <ContentWrapper>
                    <Line />
                    <ImagesWrapper>
                        {images.length > 0 ? (
                            images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={getImageUrl(img.image)}
                                    alt={`앨범 이미지 ${idx + 1}`}
                                />
                            ))
                        ) : (
                            <p>이미지를 불러오는 중...</p>
                        )}
                    </ImagesWrapper>
                </ContentWrapper>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display: flex;
    padding-left: 270px;
    padding-right: 270px;
    flex-direction: column;
    margin-top: 70px;
    margin-bottom: 100px;
    @media (max-width: 1300px) {
        padding-left: 200px;
        padding-right: 200px;
    }
    @media (max-width: 1175px) {
        padding-left: 100px;
        padding-right: 100px;
    }
    @media (max-width: 875px) {
        padding-left: 30px;
        padding-right: 30px;
    }
    > p {
        font-size: 30px;
        font-weight: 600;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 35px;
    gap: 35px;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #414142;
`;

const ImagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 30px;
    > img {
        width: 100%;
        border-radius: 10px;
    }
    > p {
        text-align: center;
        color: ${({theme}) => theme.detailText};
    }
`;
