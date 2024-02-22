// ui imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

const OverviewRecentGames = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between">
                        <p>Recent Games</p>
                        <p>See All</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow>
                            <TableHead>DATE</TableHead>
                            <TableHead>OPP</TableHead>
                            <TableHead>RESULT</TableHead>
                            <TableHead>MIN</TableHead>
                            <TableHead>FG%</TableHead>
                            <TableHead>3P%</TableHead>
                            <TableHead>FT%</TableHead>
                            <TableHead>REB</TableHead>
                            <TableHead>AST</TableHead>
                            <TableHead>BLK</TableHead>
                            <TableHead>STL</TableHead>
                            <TableHead>PTS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>SUN 2/18</TableCell>
                            <TableCell>
                                <div className="flex gap-x-1 items-center">
                                    <p>VS</p>
                                    <div className="size-5 rounded-full bg-red-500"/>
                                    <p>WEST</p>
                                </div>
                            </TableCell>
                            <TableCell><span className="text-green-700">W</span> 211-186</TableCell>
                            <TableCell>37.7</TableCell>
                            <TableCell>44.0</TableCell>
                            <TableCell>40.7</TableCell>
                            <TableCell>84.6</TableCell>
                            <TableCell>1.9</TableCell>
                            <TableCell>11.4</TableCell>
                            <TableCell>.2</TableCell>
                            <TableCell>1.3</TableCell>
                            <TableCell>25.4</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>SUN 2/18</TableCell>
                            <TableCell>
                                <div className="flex gap-x-1 items-center">
                                    <p>VS</p>
                                    <div className="size-5 rounded-full bg-red-500"/>
                                    <p>WEST</p>
                                </div>
                            </TableCell>
                            <TableCell><span className="text-green-700">W</span> 211-186</TableCell>
                            <TableCell>37.7</TableCell>
                            <TableCell>44.0</TableCell>
                            <TableCell>40.7</TableCell>
                            <TableCell>84.6</TableCell>
                            <TableCell>1.9</TableCell>
                            <TableCell>11.4</TableCell>
                            <TableCell>.2</TableCell>
                            <TableCell>1.3</TableCell>
                            <TableCell>25.4</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>SUN 2/18</TableCell>
                            <TableCell>
                                <div className="flex gap-x-1 items-center">
                                    <p>VS</p>
                                    <div className="size-5 rounded-full bg-red-500"/>
                                    <p>WEST</p>
                                </div>
                            </TableCell>
                            <TableCell><span className="text-green-700">W</span> 211-186</TableCell>
                            <TableCell>37.7</TableCell>
                            <TableCell>44.0</TableCell>
                            <TableCell>40.7</TableCell>
                            <TableCell>84.6</TableCell>
                            <TableCell>1.9</TableCell>
                            <TableCell>11.4</TableCell>
                            <TableCell>.2</TableCell>
                            <TableCell>1.3</TableCell>
                            <TableCell>25.4</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>SUN 2/18</TableCell>
                            <TableCell>
                                <div className="flex gap-x-1 items-center">
                                    <p>VS</p>
                                    <div className="size-5 rounded-full bg-red-500"/>
                                    <p>WEST</p>
                                </div>
                            </TableCell>
                            <TableCell><span className="text-green-700">W</span> 211-186</TableCell>
                            <TableCell>37.7</TableCell>
                            <TableCell>44.0</TableCell>
                            <TableCell>40.7</TableCell>
                            <TableCell>84.6</TableCell>
                            <TableCell>1.9</TableCell>
                            <TableCell>11.4</TableCell>
                            <TableCell>.2</TableCell>
                            <TableCell>1.3</TableCell>
                            <TableCell>25.4</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>SUN 2/18</TableCell>
                            <TableCell>
                                <div className="flex gap-x-1 items-center">
                                    <p>VS</p>
                                    <div className="size-5 rounded-full bg-red-500"/>
                                    <p>WEST</p>
                                </div>
                            </TableCell>
                            <TableCell><span className="text-green-700">W</span> 211-186</TableCell>
                            <TableCell>37.7</TableCell>
                            <TableCell>44.0</TableCell>
                            <TableCell>40.7</TableCell>
                            <TableCell>84.6</TableCell>
                            <TableCell>1.9</TableCell>
                            <TableCell>11.4</TableCell>
                            <TableCell>.2</TableCell>
                            <TableCell>1.3</TableCell>
                            <TableCell>25.4</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default OverviewRecentGames