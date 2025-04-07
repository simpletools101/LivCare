
type SlBannerProps = {

    bannerContent:string;
}

export default function SlBanner({bannerContent}:SlBannerProps) {
    return (
        <div className="border p-3 bg-yellow-300 text-black rounded-2xl w-fit">
            {bannerContent}
        </div>
    )
}