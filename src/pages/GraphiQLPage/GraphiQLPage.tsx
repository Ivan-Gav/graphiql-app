import { Box, Grid, Paper } from '@mui/material';
import RequestEditor from '../../components/RequestEditor/RequestEditor';
import RequestMenu from '../../components/RequestMenu/RequestMenu';
import ResponseSection from '../../components/ResponseSection/ResponseSection';
import InputApi from 'src/components/InputApi/InputApi';
import { Suspense, lazy, useRef } from 'react';
import DrawerLeft from 'src/components/DocumentationExplorer/DrawerLeft';
import { useAppSelector } from 'src/hooks/redux';
import { getDocState } from 'src/store/slice/DocSlice';
// import theme from 'src/themes/theme';

const DocumentationExplorer = lazy(
  () => import('../../components/DocumentationExplorer/DocumentationExplorer')
);

export default function GraphiQLPage() {
  const contRef = useRef(null);
  const mobContRef = useRef(null);
  const { docsOpen } = useAppSelector(getDocState);

  return (
    <>
      <InputApi />

      <Grid
        container
        display="grid"
        sx={
          docsOpen
            ? {
                transition: '.3s',
                gridTemplateColumns: { xs: '1fr', md: '300px 1fr 1fr' },
                gridTemplateRows: { xs: '1fr 1fr', md: '1fr' },
              }
            : {
                transition: '.3s',
                gridTemplateColumns: { xs: '1fr', md: '0 1fr 1fr' },
                gridTemplateRows: { xs: '1fr 1fr', md: '1fr' },
              }
        }
        rowGap={2}
        alignItems="stretch"
      >
        <Grid
          container
          position="relative"
          ref={contRef}
          overflow="hidden"
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <DrawerLeft container={contRef.current}>
            <Suspense fallback={<h2>Loading schema...</h2>}>
              <DocumentationExplorer />
            </Suspense>
          </DrawerLeft>
        </Grid>

        <Grid
          container
          overflow="auto"
          sx={{
            pl: { xs: 0, md: docsOpen ? 2 : 0 },
          }}
        >
          <Paper sx={{ p: 1, width: '100%', position: 'relative' }}>
            <Box
              component="div"
              position="absolute"
              ref={mobContRef}
              sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: { xs: 'block', md: 'none' },
              }}
            >
              <DrawerLeft container={mobContRef.current} drawerVariant="mobile">
                <Suspense fallback={<h2>Loading schema...</h2>}>
                  <DocumentationExplorer />
                </Suspense>
              </DrawerLeft>
            </Box>
            <Grid item xs={12} sx={{ p: 1 }}>
              <RequestEditor />
            </Grid>
            <Grid item xs={12} sx={{ p: 1 }}>
              <RequestMenu />
            </Grid>
          </Paper>
        </Grid>

        <Grid
          container
          overflow="auto"
          sx={{
            pl: { xs: 0, md: 2 },
          }}
        >
          <Paper sx={{ p: 2, width: '100%' }}>
            <ResponseSection />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
