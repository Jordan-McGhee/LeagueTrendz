// ui imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card"

const OverviewPlayerStats = () => {

    // : React.FC<PlayerStatsTableAveragesProps> = ({ title, data, currentData }) => {
    //     let dataTotals: any = {
    //         "gp": currentData?.gp || 0,
    //         "gs": currentData?.gs || 0,
    //         "min": currentData?.min || 0,
    //         "pts": currentData?.pts || 0,
    //         "fgm": currentData?.fgm || 0,
    //         "fga": currentData?.fga || 0,
    //         "tpm": currentData?.tpm || 0,
    //         "tpa": currentData?.tpa || 0,
    //         "ftm": currentData?.ftm || 0,
    //         "fta": currentData?.fta || 0,
    //         "orb": currentData?.orb || 0,
    //         "drb": currentData?.drb || 0,
    //         "ast": currentData?.ast || 0,
    //         "blk": currentData?.blk || 0,
    //         "stl": currentData?.stl || 0,
    //         "pf": currentData?.pf || 0,
    //         "turnovers": currentData?.turnovers || 0
    //     }
    
    
    
    //     return (
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>
    //                     <div className="flex justify-between">
    //                         <p>Stats</p>
    //                         <p>See All</p>
    //                     </div>
    //                 </CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //                 <Table>
    //                     <TableHeader>
    //                         <TableHead>STATS</TableHead>
    //                         <TableHead>GP</TableHead>
    //                         <TableHead>MIN</TableHead>
    //                         <TableHead>FG%</TableHead>
    //                         <TableHead>3P%</TableHead>
    //                         <TableHead>FT%</TableHead>
    //                         <TableHead>REB</TableHead>
    //                         <TableHead>AST</TableHead>
    //                         <TableHead>BLK</TableHead>
    //                         <TableHead>STL</TableHead>
    //                         <TableHead>PF</TableHead>
    //                         <TableHead>TO</TableHead>
    //                         <TableHead>PTS</TableHead>
    //                     </TableHeader>
    //                     <TableBody>
    
    //                         {/* REGULAR SEASON */}

    //                         {/* POST SEASON*/}
    
    //                         {/* CAREER */}
    //                         <TableRow>
    //                             <TableCell colSpan={2}>CAREER</TableCell>
    //                             <TableCell className="text-center">{dataTotals['gp']}</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['min'] / dataTotals['gp'])).toFixed(1)}</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['pts'] / dataTotals['gp']).toFixed(1))}</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['fgm'] / dataTotals['fga']) * 100).toFixed(1)}%</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['tpm'] / dataTotals['tpa']) * 100).toFixed(1)}%</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['ftm'] / dataTotals['fta']) * 100).toFixed(1)}%</TableCell>
    //                             <TableCell className="text-center">{(((dataTotals['orb'] + dataTotals['drb']) / dataTotals['gp']).toFixed(1))}</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['ast'] / dataTotals['gp']).toFixed(1))}</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['blk'] / dataTotals['gp']).toFixed(1))}</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['stl'] / dataTotals['gp']).toFixed(1))}</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['pf'] / dataTotals['gp']).toFixed(1))}</TableCell>
    //                             <TableCell className="text-center">{((dataTotals['turnovers'] / dataTotals['gp']).toFixed(1))}</TableCell>
    //                         </TableRow>
    //                     </TableBody>
    //                 </Table>
    //             </CardContent>
    //         </Card>
    //     )
    // }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-between">
                        <p>Stats</p>
                        <p>See All</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow>
                            <TableHead>SPLITS</TableHead>
                            <TableHead>GP</TableHead>
                            <TableHead>MIN</TableHead>
                            <TableHead>FG%</TableHead>
                            <TableHead>3P%</TableHead>
                            <TableHead>FT%</TableHead>
                            <TableHead>REB</TableHead>
                            <TableHead>AST</TableHead>
                            <TableHead>BLK</TableHead>
                            <TableHead>STL</TableHead>
                            <TableHead>PF</TableHead>
                            <TableHead>TO</TableHead>
                            <TableHead>PTS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Regular Season</TableCell>
                            <TableCell>10</TableCell>
                            <TableCell>37.7</TableCell>
                            <TableCell>44.0</TableCell>
                            <TableCell>40.7</TableCell>
                            <TableCell>84.6</TableCell>
                            <TableCell>1.9</TableCell>
                            <TableCell>11.4</TableCell>
                            <TableCell>.2</TableCell>
                            <TableCell>1.3</TableCell>
                            <TableCell>2.2</TableCell>
                            <TableCell>4.6</TableCell>
                            <TableCell>25.4</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Career</TableCell>
                            <TableCell>10</TableCell>
                            <TableCell>37.7</TableCell>
                            <TableCell>44.0</TableCell>
                            <TableCell>40.7</TableCell>
                            <TableCell>84.6</TableCell>
                            <TableCell>1.9</TableCell>
                            <TableCell>11.4</TableCell>
                            <TableCell>.2</TableCell>
                            <TableCell>1.3</TableCell>
                            <TableCell>2.2</TableCell>
                            <TableCell>4.6</TableCell>
                            <TableCell>25.4</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default OverviewPlayerStats