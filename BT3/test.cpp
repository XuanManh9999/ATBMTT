#include <bits/c++io.h>
#include <graphics.h>
#include <conio.h>
#define ROUND(a) (long) (a + 0.5)
void plot (int xc, int yc, int x, int y, int color)
{
    putpixel (xc + x, yc + y, color);

    putpixel (xc - x, yc + y, color);
    
}
