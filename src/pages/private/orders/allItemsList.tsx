import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/rootStore";
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemButton } from "@mui/material";

const AllItemList:React.FC<any> = ({editMode}) => {
  const {
    rootStore: { orderStore },
  } = useStore();
  const { cartItems, removeFromCart } = orderStore;

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }

  function subtotal(items: readonly any[]) {
    return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
  }

  const invoiceSubtotal = subtotal(cartItems);
  const invoiceTotal = invoiceSubtotal;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={5}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Discount (%)</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((row, i) => (
            <TableRow key={i}>
              <TableCell>
                {editMode && editMode == true ? <ListItemButton onClick={() => removeFromCart(i)}><DeleteIcon /></ListItemButton>: <ListItemButton>{i+1}</ListItemButton>}
              </TableCell>
              <TableCell>
              {row.product.label}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.discount}</TableCell>
              <TableCell align="right">{ccyFormat(row.total)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default observer(AllItemList);
