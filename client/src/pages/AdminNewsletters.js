import {
  Delete as DeleteIcon,
  GetApp as ExportIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { adminAPI } from "../services/api";

const AdminNewsletters = ({ user, onLogout, cartItemCount }) => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    email: "",
  });

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        const data = await adminAPI.getNewsletters(page + 1, rowsPerPage);
        setNewsletters(data.subscribers);
        setTotalSubscribers(data.pagination.totalSubscribers);
      } catch (err) {
        setError("Error loading newsletter subscribers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, [page, rowsPerPage]);

  const refetchNewsletters = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getNewsletters(page + 1, rowsPerPage);
      setNewsletters(data.subscribers);
      setTotalSubscribers(data.pagination.totalSubscribers);
    } catch (err) {
      setError("Error loading newsletter subscribers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id, email) => {
    setDeleteDialog({ open: true, id, email });
  };

  const handleDeleteConfirm = async () => {
    try {
      await adminAPI.deleteNewsletter(deleteDialog.id);
      setSuccess("Subscriber removed successfully");
      setDeleteDialog({ open: false, id: null, email: "" });
      refetchNewsletters();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error removing subscriber");
      console.error(err);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, id: null, email: "" });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExport = () => {
    adminAPI.exportNewsletters();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1">
            Newsletter Subscribers
          </Typography>
          <Button
            variant="contained"
            startIcon={<ExportIcon />}
            onClick={handleExport}
            disabled={newsletters.length === 0}
          >
            Export CSV
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        )}

        <Box sx={{ mb: 2 }}>
          <Chip
            label={`Total Subscribers: ${totalSubscribers}`}
            color="primary"
            variant="outlined"
          />
        </Box>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Subscribed Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : newsletters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body1" color="text.secondary">
                        No newsletter subscribers found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  newsletters.map((subscriber) => (
                    <TableRow key={subscriber._id}>
                      <TableCell>{subscriber.email}</TableCell>
                      <TableCell>
                        {formatDate(subscriber.subscribedAt)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={subscriber.isActive ? "Active" : "Inactive"}
                          color={subscriber.isActive ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDeleteClick(subscriber._id, subscriber.email)
                          }
                          title="Remove subscriber"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalSubscribers}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={handleDeleteCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Remove Newsletter Subscriber
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove "{deleteDialog.email}" from the
              newsletter? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
};

export default AdminNewsletters;
