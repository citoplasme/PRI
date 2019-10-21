<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="doc">
        <html>
            <head>
                <title>
                    <xsl:value-of select="./tit"/>
                </title>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="/w3.css"/>
            </head>
            <body>    
                <div class="w3-content" style="max-width:1600px">
                    <header class="w3-container w3-center w3-padding-48 w3-white">
                        <h1 class="w3-xxxlarge"><b><xsl:value-of select="./tit"/></b></h1>
                        <h6><xsl:value-of select="./local"/> <span class="w3-tag"><xsl:value-of select="./prov"/></span></h6>
                    </header>
                </div>
                <div class="w3-row-padding w3-padding-64 w3-black">
                    <div class="w3-quarter">
                        <h3 class="w3-text-red"><b>Informações:</b></h3>
                        <h6>
                            <b>Duração: </b>
                            <xsl:value-of select="./duracao"/>
                        </h6>
                        <h6>
                            <b>Ficheiro: </b>
                            <xsl:value-of select="./file"/>
                        </h6>
                    </div>
                    <xsl:apply-templates/>    
                </div>
                <footer class="w3-container w3-padding-64 w3-white w3-center w3-large">
                    <h6>Powered by: <a href="https://www.w3schools.com/w3css/default.asp">w3.css</a></h6>
                </footer>
              
            </body>
        </html>     
    </xsl:template>

    <xsl:template match="prov"/>
    
    <xsl:template match="local"/>
        
    <xsl:template match="tit"/>
    
    <xsl:template match="musico">
        <div class="w3-quarter">
            <h3 class="w3-text-red"><b>Músico(s):</b></h3>
            <h6><xsl:apply-templates/></h6>
        </div>
    </xsl:template>
    
    <xsl:template match="from">
        <i>(<xsl:value-of select="."/>)</i>
    </xsl:template>
    
    <xsl:template match="prof">
        <i>(<xsl:value-of select="."/>)</i>
    </xsl:template>
    
    <xsl:template match="doc/file"/>
    
    
    <xsl:template match="duracao"/>

    
    <xsl:template match="obs">
        <div class="w3-quarter">
            <h3 class="w3-text-red"><b>Observações:</b></h3>
            <ol>
            <xsl:for-each select="./file">
                <li><xsl:value-of select="."/></li>
            </xsl:for-each>
            </ol>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="obs/file"/>
    
    <xsl:template match="intxt">
        <b>Instrumento Extra - </b> <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="inst">
        <b>Instrumento - </b> <i><xsl:apply-templates/></i>
    </xsl:template>
    
    
    
    
   
    
    
</xsl:stylesheet>