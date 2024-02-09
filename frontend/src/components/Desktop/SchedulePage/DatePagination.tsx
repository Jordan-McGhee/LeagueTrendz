import React from "react";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "../../ui/pagination";

const DatePagination = () => {
    return (
        <div className="">
            <Pagination>

                <PaginationContent className="w-full flex justify-between">

                    {/* back */}
                    <PaginationItem className="">
                        <PaginationPrevious href="#" />
                    </PaginationItem>

                    {/* sunday */}
                    <PaginationItem className="">
                        <PaginationLink href="" className="flex flex-col p-6">
                            <p className="font-bold">SUN</p>
                            <p className="text-xs">FEB 4</p>
                        </PaginationLink>
                    </PaginationItem>

                    {/* monday */}
                    <PaginationItem className="">
                        <PaginationLink href="" className="flex flex-col p-6">
                            <p className="font-bold">MON</p>
                            <p className="text-xs">FEB 5</p>
                        </PaginationLink>
                    </PaginationItem>

                    {/* tuesday */}
                    <PaginationItem className="">
                        <PaginationLink href="" className="flex flex-col p-6">
                            <p className="font-bold">TUE</p>
                            <p className="text-xs">FEB 6</p>
                        </PaginationLink>
                    </PaginationItem>

                    {/* wednesday */}
                    <PaginationItem className="">
                        <PaginationLink href="" className="flex flex-col p-6" isActive>
                            <p className="font-bold">WED</p>
                            <p className="text-xs">FEB 7</p>
                        </PaginationLink>
                    </PaginationItem>

                    {/* thursday */}
                    <PaginationItem className="">
                        <PaginationLink href="" className="flex flex-col p-6">
                            <p className="font-bold">THU</p>
                            <p className="text-xs">FEB 8</p>
                        </PaginationLink>
                    </PaginationItem>

                    {/* friday */}
                    <PaginationItem className="">
                        <PaginationLink href="" className="flex flex-col p-6">
                            <p className="font-bold">FRI</p>
                            <p className="text-xs">FEB 9</p>
                        </PaginationLink>
                    </PaginationItem>

                    {/* saturday */}
                    <PaginationItem className="">
                        <PaginationLink href="" className="flex flex-col p-6">
                            <p className="font-bold">SAT</p>
                            <p className="text-xs">FEB 10</p>
                        </PaginationLink>
                    </PaginationItem>

                    {/* forward */}
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>

                </PaginationContent>

            </Pagination>
        </div>
    )
}

export default DatePagination