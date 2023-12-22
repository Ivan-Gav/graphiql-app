import { Drawer } from '@mui/material';
import { useAppSelector } from 'src/hooks/redux';

const drawerWidth = '100%';

type DrawerProps = {
  container: HTMLElement | null;
  children: React.ReactNode;
};

export default function DrawerLeft(props: DrawerProps) {
  const { children, container } = props;
  const { docsOpen } = useAppSelector((state) => state.docReducer);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        overflow: 'hidden',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'absolute',
          borderWidth: 0,
        },
      }}
      ModalProps={{
        container: container,
        style: { position: 'absolute' },
      }}
      variant="persistent"
      anchor="left"
      open={docsOpen}
      elevation={2}
    >
      {children}
    </Drawer>
  );
}
