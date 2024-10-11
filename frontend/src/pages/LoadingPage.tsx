// ui imports
import { Skeleton } from "../components/ui/skeleton"
import { Card } from "../components/ui/card"

// full page skeleton
const LoadingPage = () => {
    return (
        <div className="min-h-svh">
            <Card className="p-4">
                {/* hero section */}
                {/* <HeroSkeleton /> */}
                {/* <div className="flex items-center gap-4 h-1/5 p-4">
                    <Skeleton className="h-[90px] w-[90px] rounded-full" />
                    <div className="flex flex-col gap-y-2">
                        <Skeleton className="h-4 w-[450px] rounded-full" />
                        <Skeleton className="h-4 w-[300px] rounded-full" />
                        <Skeleton className="h-4 w-[100px] rounded-full" />
                    </div>
                </div> */}

                <div className="flex gap-x-2 h-4/5">

                    <div className="flex flex-col gap-y-2 w-full md:w-[65%]">
                        <Card className="flex flex-col gap-y-2 p-4">
                            <Skeleton className="w-full h-56 rounded-lg" />
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-2/3 h-4" />
                        </Card>
                        <Card className="flex flex-col gap-y-2  p-4">
                            <Skeleton className="w-full h-56 rounded-lg" />
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-2/3 h-4" />
                        </Card>
                    </div>

                    <div className="hidden md:flex flex-col gap-y-2 w-[35%]">
                        <Card>
                            <div className="flex flex-col gap-y-2 p-4">
                                <Skeleton className="w-full h-28 rounded-lg" />
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-2/3 h-4" />
                            </div>
                        </Card>

                        <Card>
                            <div className="flex flex-col gap-y-2 p-4">
                                <Skeleton className="w-full h-28 rounded-lg" />
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-2/3 h-4" />
                            </div>
                        </Card>

                        <Card>
                            <div className="flex flex-col gap-y-2 p-4">
                                <Skeleton className="w-full h-28 rounded-lg" />
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-2/3 h-4" />
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default LoadingPage