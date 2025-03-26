import { GetPdfTemplateResponse } from '@/services';
import { dateToString, getUiUserFullName } from '@/utils';
import { FormControl, FormLabel, Typography, FormGroup, Grid2, TextField, IconButton, InputAdornment } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface PdfTemplateDataFormProps {
  pdfTemplateResponse: GetPdfTemplateResponse;
  pdfTemplateVersions: string[];
  pdfVersionClickCallback: (versionId: string) => void;
}

export const PdfTemplateDataForm = ({ pdfTemplateResponse, pdfTemplateVersions, pdfVersionClickCallback }: PdfTemplateDataFormProps) => {
  return (
    <FormControl>
      <FormLabel sx={{ marginBottom: 2 }}>
        <Typography color="info">Basic Details</Typography>
      </FormLabel>

      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <FormGroup>
            <Grid2 container spacing={2}>
              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="ID"
                  value={pdfTemplateResponse.id}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="Created Date"
                  value={dateToString(pdfTemplateResponse.createdDate)}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="Created By"
                  value={`${getUiUserFullName(pdfTemplateResponse.createdBy)} (${pdfTemplateResponse.createdBy.email})`}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="Modified Date"
                  value={dateToString(pdfTemplateResponse.modifiedDate)}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="Last Modified By"
                  value={`${getUiUserFullName(pdfTemplateResponse.lastModifiedBy)} (${pdfTemplateResponse.lastModifiedBy.email})`}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="Version ID"
                  value={pdfTemplateResponse.versionId}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={4}>
                <TextField
                  fullWidth
                  label="Size"
                  value={`${pdfTemplateResponse.size} bytes`}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid2>
            </Grid2>
          </FormGroup>
        </Grid2>
        <Grid2 size={7}>
          <FormGroup>
            <FormLabel sx={{ marginBottom: 2 }}>
              <Typography color="info">User Involvements</Typography>
            </FormLabel>

            <Grid2 container spacing={2}>
              {pdfTemplateResponse.userInvolvements.length > 0 ? (
                pdfTemplateResponse.userInvolvements.map((involvement, index) => (
                  <Grid2 size={12} key={index}>
                    <TextField
                      fullWidth
                      value={`${getUiUserFullName(involvement.pdfTemplate.lastModifiedBy)} (${pdfTemplateResponse.lastModifiedBy.email}) - ${dateToString(involvement.date)}`}
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                    />
                  </Grid2>
                ))
              ) : (
                <Typography variant="body2">No user involvements.</Typography>
              )}
            </Grid2>
          </FormGroup>
        </Grid2>
        <Grid2 size={5}>
          <FormGroup>
            <FormLabel sx={{ marginBottom: 2 }}>
              <Typography>Versions IDs</Typography>
            </FormLabel>

            <Grid2 container spacing={2}>
              {pdfTemplateVersions.length > 0 ? (
                pdfTemplateVersions.map((version, index) => (
                  <Grid2 size={12} key={index}>
                    <TextField
                      onClick={() => {
                        pdfVersionClickCallback(version);
                      }}
                      fullWidth
                      value={version}
                      slotProps={{
                        input: {
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <PictureAsPdfIcon color="info" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid2>
                ))
              ) : (
                <Typography variant="body2">No versions.</Typography>
              )}
            </Grid2>
          </FormGroup>
        </Grid2>
      </Grid2>
    </FormControl>
  );
};
