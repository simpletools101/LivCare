import LxButton from '@/components/common/lx-button'
import ProductLogo from '@/components/common/product-logo'
import UserAccountItem from '@/components/common/user-account'
import { AlignJustify, History } from 'lucide-react'

export default function Titlebar() {
    return (
        <div className="h-[70px] flex justify-between items-center border">
            <div className="flex items-center space-x-5 ml-3">
                <ProductLogo />
            </div>
            <div className="mr-6 flex  items-center space-x-5">
                <div className='max-[475px]:hidden'>
                    <LxButton>
                        <History />
                    </LxButton>
                </div>
                <UserAccountItem />
            </div>
        </div>
    )
}
