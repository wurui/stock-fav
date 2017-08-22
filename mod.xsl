<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:oxm="https://www.openxsl.com">
    <xsl:template match="/root" name="wurui.stock-fav">
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-stock-fav" ox-mod="stock-fav" data-uid="{login/uid}">
            <div class="searchbar">
                <input type="search" class="J_search" placeholder="input a symbol"/>
            </div>
            <ul>
                <xsl:for-each select="data/stock-analysis/i">
                    <li class="rel-list">
                        <button class="bt-del" data-symbol="{symbol}">Delete</button>
                        <xsl:value-of select="symbol"/>
                    </li>
                </xsl:for-each>
            </ul>
        </div>
    </xsl:template>
</xsl:stylesheet>
